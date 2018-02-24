<template>
  <div class="home_wrap">
    <div class="ajb" v-if="showBanner">
      <swiper :options="swiperOption" ref="bannerSwiper" class="shouBox">
        <swiper-slide v-for="(item,index) in bannerImg" :key="index" class="fanbox">
          <a @click="openGameDel(item.action)">
            <img class="swipeImageitem" v-shouyebanner="puburl + '/' + item.image">
          </a>
        </swiper-slide>
        <div class="swiper-pagination bottomPage" slot="pagination"></div>
      </swiper>
    </div>
    
    <div class="top_part underline" v-if="showT">
      <h3 class="title">{{TOPname}}</h3>
      <div class="top_part_wrap">
        <ul class="top_game_list">
          <li class="top_game_item" v-for="item in homeCenter.list" @click.stop="gameDel(homeCenter.topic, item)">
            <div class="top_icon_wrap">
              <img v-youqingtuijian="puburl + '/' + item.icon" width="100%" height="100%" v-if="!!item.icon">
              <img class="tips" :src="puburl + '/' + item.cornerImage"  v-if="!!item.cornerImage">
              <img class="tips" src="../../../assets/new@2x.png" v-if="!item.cornerImage && !!item.isNew">
            </div>
            <div class="top_game_title">
              {{item.name}}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="center_part underline" v-if="showH">
      <h3 class="title">主题中心</h3>
      <div class="center_part_wrap">
        <ul class="center_game_list">
          <li class="center_game_item" v-for="(item, index) in homeTop" @click.stop="goPart(item, index)">
            <div class="center_image_wrap">
              <img v-zhutizhongxin="puburl + '/' + item.backImage" width="100%" height="100%">
            </div>
            <div class="center_icon_wrap">
              <img :src="puburl + '/' + item.icon" width="100%" height="100%">
            </div>
            <div class="center_game_title">
              {{item.name}}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="bottom_part" v-if="showB">
      <h3 class="title">{{BOTname}}</h3>
      <ul class="bottom_game_list">
        <li class="bottom_game_item" v-for="(item, index) in homeBottom.list" @click.stop="gameDel(homeBottom.topic, item)">
          <div class="bottom_game_title">
            {{item.name}}
          </div>
          <div class="bottom_game_image">
            <img v-jingpingyouxi="puburl + '/' + item.backImage">
          </div>
        </li>
      </ul>
    </div>
    <div class="icpBoX">
      <div class="icp"><span class="box_line"></span><span class="box_text">我们是有底线的</span><span class="box_line"></span></div>
    </div>
    <div class="box_wrap" @click.stop="luckDraw" v-if="showBox">
      <img src="../../../assets/box.png" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Classification from 'components/common/classification'
  import titlestyleone from 'components/common/titlestyleone'
  import packageItem from 'components/common/packageitem'
  import packageCount from 'components/common/packagecount'
  import gameMsg from "api/game"
  import getBanner from "api/banner"
  import {mapActions, mapGetters, mapState} from "vuex"
  export default {
    name: 'index-page',
    data(){
      return {
        puburl: sessionStorage.getItem("puburl"),
        bannerImg: [],
        homeTop: [],
        homeCenter: {},
        homeBottom: {},
        swiperOption: {
          loop: false,                           //循环播放
          initialSlide: 0,
          autoplay: 3000,                       //自动播放间隔时间
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          autoplayDisableOnInteraction: false,   //操作之后会继续自动滑动
          observer: true,
          observeParents: true,
          paginationType : 'custom',
          swiperIndex: 0,
        },
        showBox: true,
        showBanner: true,
        showT: true,
        showH: true,
        showB: true,
        TOPname: '',
        BOTname: ''
      }
    },
    created(){
      let count = 0; // 判断所有请求结束
      this.device();
      // 获取banner图片
      if (!!sessionStorage.getItem("bannerImg")) {
        this.bannerImg = JSON.parse(sessionStorage.getItem("bannerImg"));
        this.$nextTick(() => {
          this.swiperIndex = this.$refs.bannerSwiper.swiper;
          this.swiperIndex.params.paginationCustomRender = (swiper, current, total) => {
            return '<span>' + this.bannerImg[current-1].description + '</span><span style="position: absolute;right: 13px; bottom: 0">' + '<span style="color: #34dbbf">' + current + '</span>/' + total + '</span>';
          };
          this.swiperIndex.update();
        })
      } else { 
        let homeImg = {section: "home-top"};
        getBanner.bannerList(homeImg).then((res) => {
          if (res.data.code == "0") {
            this.bannerImg = res.data.data;
            sessionStorage.setItem('bannerImg', JSON.stringify(this.bannerImg))
            this.$nextTick(() => {
              this.swiperIndex = this.$refs.bannerSwiper.swiper;
              this.swiperIndex.params.paginationCustomRender = (swiper, current, total) => {
                return '<span>' + this.bannerImg[current-1].description + '</span><span style="position: absolute;right: 13px; bottom: 0">' + '<span style="color: #34dbbf">' + current + '</span>/' + total + '</span>';
              };
              this.swiperIndex.update();
            })
          } else {
            this.showBanner = false;
            this.$toast(res.data.userMessage);
          }
        })
      }
      // 主页顶部
      if (!!sessionStorage.getItem("homeTop")) {
        this.homeTop = JSON.parse(sessionStorage.getItem("homeTop"));
      } else {
        let top = { section: 'home-central-topic'}
        gameMsg.topicList(top).then((res) => {
          if (res.data.code == '0') {
            this.homeTop = res.data.data;
            sessionStorage.setItem('homeTop', JSON.stringify(this.homeTop))
            this.showT = true;
          } else {
            this.$toast(res.data.userMessage);
          }
        })
      }
      // 主页中部
      if (!!sessionStorage.getItem("homeCenter")) {
        this.homeCenter = JSON.parse(sessionStorage.getItem("homeCenter"));
        this.TOPname = this.homeCenter.topic.name;
      } else {
        let central = {section: 'home-top-topic'};
        gameMsg.homeList(central).then((res) => {
          if (res.data.code == '0') {
            this.homeCenter = res.data.data;
            this.TOPname = this.homeCenter.topic.name;
            sessionStorage.setItem('homeCenter', JSON.stringify(this.homeCenter));
          } else {
            this.showH = false;
            // this.$toast(res.data.userMessage);
          }
        })
      }
      if (!!sessionStorage.getItem("homeBottom")) {
        this.homeBottom = JSON.parse(sessionStorage.getItem("homeBottom"));
        this.BOTname = this.homeBottom.topic.name;
      } else {
        let bottom = {section: 'home-bottom-topic'};
        gameMsg.homeList(bottom).then((res) => {
          if (res.data.code == '0') {
            this.homeBottom = res.data.data;
            this.BOTname = this.homeBottom.topic.name;
            sessionStorage.setItem('homeBottom', JSON.stringify(this.homeBottom));
          } else {
            this.showB = false;
            // this.$toast(res.data.userMessage);
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'set_wxstate', 'showloading'
      ]),
      loadFn(obj){
        this.showloading(obj)
      },
      // 游戏详情
      gameDel(type, item, pack){
        let id;
        if(pack){
          id = pack.gameId
        }else{
          id = item.id
        }
        this.$router.push(`/gameDel/${id}`);
      },
      // banner图片跳转
      openGameDel(item){
        if(!!item){
          let re = new RegExp("gameId=");
          if(re.test(item)){
            let id = item.split('=')[1];
            this.$router.push(`/gameDel/${id}`);
          }else{
            window.location.replace(item)
          }
        }
      },
      // 4大模块
      goPart(item, index){
        let id = item.id;
        this.$router.push({path: '/giftcenter?giftId=' + id});
      },
      // 下载游戏
      device(item){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
          this.showBox = false;
        }
      },
      isWeiXin() {
        let weixinDevice;
        let ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=='micromessenger'){
          weixinDevice = true
        }else {
          weixinDevice = false
        }
        this.set_wxstate(weixinDevice)
      },
      // 抽奖
      luckDraw(){
        this.isWeiXin();
        window.location.href = `https://www.5iqianshou.com/middlepage/?fromKey=app&chanel=h5download`;
      }
    },
    components: {
      swiper,
      swiperSlide,
      'circle-pane': Classification,
      'title-one': titlestyleone,
      'package-item': packageItem,
      'package-count': packageCount
    },
    destroyed(){
      this.swiperIndex = null;
    }
  }

</script>


<style lang="less" scoped>
@r: 37.5rem;
.home_wrap{
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .box_wrap{
    position: fixed;
    right: 22/@r;
    bottom: 138/@r;
    width: 43/@r;
    height: 50/@r;
    overflow: hidden;
  }
  /*中部广告图片*/
  .ajb {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding-top: 150/@r;
    .shouBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .swipeImageitem{
      width: 100%;
    } 
    /* banner  下文字*/
    .bottomPage{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      background: rgba(0,0,0,0.6);
      color: #fafafa;
      line-height: 20px;
      font-size: 11px;
    }
  }
  .top_part{
    padding: 21/@r 0 12/@r 13/@r;
    .title{
      font-size: 16px;
      color: #2a2a2a;
      line-height: 16px;
      height: 16px;
      font-weight: normal;
    }
    .top_part_wrap{
      height: 128/@r;
      overflow-y: hidden; 
      .top_game_list{
        padding-top: 24/@r;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        font-size: 0;
        .top_game_item{
          display: inline-block;
          margin-right: 16/@r;
          &:last-child{
            margin-right: 13/@r;
          }
          .top_icon_wrap{
            width: 80/@r;
            height: 80/@r;
            border-radius: 15/@r;
            overflow: hidden;
            margin-bottom: 10/@r;
            position: relative;
            .tips{
              position: absolute;
              width: 40/@r;
              height: 40/@r;
              top: 0;
              right: 0;
              border-radius: 0;
            }
          }
          .top_game_title{
            font-size: 12px;
            color: #2a2a2a;
            height: 24px;
            line-height: 12px;
            overflow: hidden;
            width: 80/@r;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .center_part{
    padding: 21/@r 0 12/@r 13/@r;
    .title{
      font-size: 16px;
      color: #2a2a2a;
      line-height: 16px;
      height: 16px;
      font-weight: normal;
    }
    .center_part_wrap{
      height: 104/@r;
      overflow-y: hidden;
      .center_game_list{
        padding-top: 24/@r;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch; 
        font-size: 0;
        .center_game_item{
          display: inline-block;
          margin-right: 7/@r;
          position: relative;
          &:last-child{
            margin-right: 13/@r;
          }
          .center_image_wrap{
            width: 168/@r;
            height: 80/@r;
            border-radius: 7/@r;
            overflow: hidden;
            margin-bottom: 10/@r;
          }
          .center_icon_wrap{
            position: absolute;
            top: 26/@r;
            left: 14/@r;
            width: 28/@r;
            height: 28/@r;
            overflow: hidden;
            margin-right: 14/@r;
          }
          .center_game_title{
            position: absolute;
            font-size: 18px;
            top: 0;
            left: 56/@r;
            height: 80/@r;
            line-height: 80/@r;
            color: #fff;
          }
        }
      }
    }
  }
  .bottom_part{
    padding: 21/@r 13/@r 0;
    .title{
      font-size: 16px;
      color: #2a2a2a;
      line-height: 16px;
      height: 16px;
      font-weight: normal;
    }
    .bottom_game_list{
      padding-top: 26/@r;
      .bottom_game_item{
        margin-bottom: 27/@r;
        &:last-child{
          margin-bottom: 0/@r;
        }
        .bottom_game_title{
          width: 300/@r;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 20px;
          color: #2a2a2a;
          height: 20px;
          line-height: 20px;
          padding-bottom: 12/@r;
          font-weight: bold;
        }
        .bottom_game_image{
          width: 100%;
          height: 120/@r;
          overflow: hidden;
          border-radius: 10/@r;
          img{
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
  .icpBoX{
    height: 48/@r;
    width: 100%;
    text-align: center;
    font-size: 0;
    padding: 0 13/@r;
    box-sizing: border-box;
    margin-bottom: 54/@r;
    .icp{
      height: 48/@r;
      font-size: 0;
      width: 100%;
      .box_line{
        display: inline-block;
        vertical-align: middle;
        width: 132/@r;
        height: 1px;
        background-color: #d3d3d3;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }
      .box_text{
        display: inline-block;
        vertical-align: middle;
        line-height: 48/@r;
        font-size: 10px;
        color: #999;
        padding: 0 6/@r;
      }
    }
  }

}
@media screen and (min-width: 500px) {
  .home_wrap{
    width: 680px;
    margin: 0 auto;
  }
} 
</style>
