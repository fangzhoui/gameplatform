<template>
  <!--头部返回-->
  <div class="gameDelWrap">
    <div class="backBox" v-if="getTitleShow">
      <div class="fan" @click.stop="backTo"><img src="../../../assets/fan@2x.png">返回</div>
      <div class="backTie">{{gameDel.name}}</div>
    </div>
    <!--游戏详情页-->
    <div class="live_box" :class="{'no_scroll': !getTitleShow}" ref="gameDelwrap">
      <!--简介-->
      <div class="live_box_wrap">
        <div class="imgBg_wrap" v-if="!!gameDel.backImage">
          <img class="imgBg" v-shouyebanner="puburl + '/' + gameDel.backImage">
        </div>
        <div class="live_title">
          <div class="hot_item" v-if="!!gameDel.icon">
              <img class="icon" v-xiuxianicon="puburl + '/' + gameDel.icon">
          </div>
          <div class="text_wrap">
            <div class="text">
              <p v-text="gameDel.name"></p>
            </div>
            <div class="star_wrap">
              <span class="star_box">
                <star :score="gameDel.star"></star>
              </span>
            </div>
            <div class="text_content">
              <span class="size">{{gameDel.size}}{{gameDel.unit}}</span>
              <span class="download_count">{{gameDel.downloadCount}}人下载</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bar_wrap" :class="{'fixBar': fixed == true}" ref="searchBar">
        <div class="bar_box">
          <div class="barItem" @click="select('game-desc')" :class="{'select_bottom': selectBar}">详情</div>
          <div class="barItem" @click="select('game-rating')" :class="{'select_bottom': !selectBar}">评价<span class="ratingNum" :class="{'select_color': !selectBar}">{{getRatingCount}}</span></div>
          <div class="barDownLoadIcon" @click.stop="device">下载</div>
        </div>
        <div class="line"></div>
      </div>
      <div :class="{'paddTop': fixed == true}" class="wrap_height" v-if="detalShow">
        <components :is="selectpage" :gameDel="gameDel"></components>
      </div>
    </div>
    <transition name="scole">
      <div class="swipe_box" v-if="getShowSwipe">
        <swipe :index="getIndex" :swipePic="images"></swipe>
      </div>
    </transition>
  </div>
</template>

<script>
import star from 'components/common/star'
import gameRating from 'components/pages/gamedel/gamerating'
import gameDesc from 'components/pages/gamedel/gamedesc'
import {formatDate} from 'js/date'
import gameMsg from 'api/game'
import { mapGetters, mapActions } from 'vuex'
import { Indicator } from 'mint-ui'
import swipe from 'components/pages/gamedel/swipe'
import feedapi from 'api/feedlist'

export default{
  name: 'gameDel',
  data () {
    return {
      puburl: sessionStorage.getItem('puburl'),
      gameDel: {},
      images: [],
      selectBar: true,
      fixed: false,
      selectpage: 'game-desc',
      detalShow: false, // 加载完数据后显示
      scrollT: 0,
      isNewIn: false,
      downNow: false
    }
  },
  props: ['id'],
  created(){
    window.location.href = window.location.href;
    this.getContent(this.id);
    this.getcommentList(this.id);
    this.setHistroyInsert(this.id);
  },
  mounted(){
    this.$nextTick(function () {
      window.addEventListener('scroll', this.fixedBar)
    });
    this.ratingType(0);
    if(!!this.$route.query.newIn){
      this.isNewIn = true;
    }
    if(!!this.$route.query.directlyDownload){
      this.downNow = true;
    }
  },
  computed: {
    ...mapGetters([
      'getIndex', 'getShowSwipe', 'getTitleShow', 'getRatingCount'
    ]),
  },
  watch: {
    'getTitleShow'(f, n){
      if(f){
        this.$nextTick(() => {
          window.scrollTo(0, this.scrollT);
          document.documentElement.scrollTo(0, this.scrollT);
          document.body.scrollTo(0, this.scrollT);
        })    
      }else{
        this.scrollT = document.documentElement.scrollTop || document.body.scrollTop;
      }
    },
    '$route' (to, from) {
      this.getContent(this.id);
      this.getcommentList(this.id);
      this.setHistroyInsert(this.id);
    }
  },
  methods: {
    ...mapActions([
      'set_wxstate', 'ratingList', 'ratingCount', 'gameName', 'ratingType'
    ]),
    fixedBar(e){
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrolled >= 135) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    backTo(){ // 返回进来的地方
      if(!!this.isNewIn){
        this.$router.replace({path: '/'})
      }else{
        window.history.back();
      }
    },
    getContent(id){
      let _self = this;
      let gameId = {gameId: id};
      this.detalShow = false;
      gameMsg.searchDetail(gameId).then(function (responce) {
        if (responce.data.code == "0") {
          _self.gameDel = responce.data.data;
          _self.images = JSON.parse(_self.gameDel.images);
          _self.detalShow = true;
          _self.gameName(_self.gameDel.name)
          if(!!_self.downNow){
            _self.device();
          }
        } else {
          _self.$toast(responce.data.userMessage);
        }
      })
    },
    getcommentList(id){ // 获取游戏评论列表
      let obj = {
        linkId: id,
        linkType: 0,
        pageSize: 10,
      }
      feedapi.commentList(obj).then((res) => {
        if (res.data.code == '0') {
          this.ratingList(res.data.data.voList);
          this.ratingCount(res.data.data.count);
        } else {
          this.$toast(res.data.userMessage);
        }
      })
    },
    // 插入浏览记录
    setHistroyInsert(gameId){
      let id = {
        linkId: gameId,
        type: 0
      }
      gameMsg.historyInsert(id).then((res) => {});
    },
    // 下载游戏
    device(){
      let item = this.gameDel;
      let type;
      this.downNow = false;
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        type = 'ios';
        if(item.iosUrl) {
          window.location.href = item.iosUrl
          this.downCount(type);
        } else{
          this.$toast('该游戏暂无ios版本');
        } 
      } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
        if(item.androidUrl) {
          type = 'android';
          this.isWeiXin(item.androidUrl);
          this.downCount(type);
        }else{
          this.$toast('该游戏暂无安卓版本');
        }
      } else { //pc
        type = 'android';
        this.downCount(type);
        window.location.href = item.androidUrl;
      };
    },
    isWeiXin(url) {
      let weixinDevice;
      let ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=='micromessenger'){
        weixinDevice = true
        var state = {
            title: document.title,
            url: window.location.href,
            otherkey: null
        };
        if(!window.location.href.match(/directlyDownload/g) || !window.location.href.match(/newIn/g)){
          history.replaceState(state, document.title, window.location.href + '?directlyDownload=1&newIn=1');
        }
      }else {
        weixinDevice = false
        window.location.href = url
      }
      this.set_wxstate(weixinDevice)
    },
    downCount(type){
      let gameId = this.gameDel.gameId;
      let a = {
        id: gameId,
        deviceType: type
      }
      gameMsg.downloadRecord(a).then((res) => {
        this.gameDel.downloadCount++;
      });
    },
    select(part){
      if(part == 'game-rating'){
        this.selectBar = false;
        // this.getcommentList(this.gameId)
      }
      if(part == 'game-desc'){
        this.selectBar = true;
      }
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrolled >= 135){
        document.documentElement.scrollTop = 135;
        document.body.scrollTop = 135;
      }
      this.selectpage = part;
    },
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  components: {
    'star': star,
    'game-rating': gameRating,
    'game-desc': gameDesc,
    swipe,
  },
}
</script>


<style lang='less' scoped>
  @r: 37.5rem;
  .live_box {
    position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .no_scroll{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  /*头部返回*/
  .backBox {
    display: flex;
    justify-content: space-between;
    background-color: #34dbbf;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #ffffff;
    z-index: 1;
  }
  .fan {
    margin-left: 14px;
  }

  .fan img {
    position: relative;
    top: 2px;
    margin-right: 11px;
    width: 8px;
    height: 14px;
  }

  .backTie {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    overflow: hidden;
    width: 200/@r;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  @media screen and (min-width: 500px) {
    .gameDelWrap{
      width: 680px;
      margin: 0 auto;
    }
    .live_box{
      width: 680px;
      margin: 0 auto;
    }
    .backBox{
      width: 680px;
      left: 50%;
      transform: translateX(-50%);
    }
    .fixBar{
      width: 680px;
      margin: 0 auto;
    }
  }

  .live_box_wrap{
    width: 100%;
    /*height: 167/@r;*/
    .imgBg_wrap{
      width: 100%;
      height: 100/@r;
      overflow: hidden;
      margin-bottom: 13/@r;
      img{
        width: 100%;
        z-index: -1;
        filter: blur(8px);
      }
    }
    .live_title{
      display: flex;
      margin-bottom: 10/@r;
      .hot_item{
        flex: 0 0 83/@r;
        padding-left: 13/@r;
        img{
          border-radius: 7/@r;
          overflow: hidden;
          width: 70/@r;
          height: 70/@r;
        }
      }
      .text_wrap{
        flex: 1;
        .text{
          padding-top: 10/@r;
          margin-bottom: 10/@r;
          p{
            font-size: 13px;
            line-height: 1;
            color: #333;
            font-weight: bold;
          }
        }
        .star_wrap{
          font-size: 0;
          color: #333;
          margin-bottom: 0px;
          .star_box{
            display: inline-block;
            vertical-align: top;
            padding-right: 13px;
          }
        }
      }
      .text_content{
        font-size: 0;
        margin-top: 10/@r;
        .size{
          display: inline-block;
          font-size: 10px;
          line-height: 1;
        }
        .download_count{
          padding-left: 10/@r;
          display: inline-block;
          font-size: 10px;
          line-height: 1;
        }
      }
    }
  }
  .bar_box{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    height: 40px;
    padding-top: 7px;
    background: #fff;
  }
  .barItem{
    width: 80px;
    text-align: center;
    font-size: 16px;
    color: #333;
    position: relative;
    line-height: 40px;
    box-sizing: border-box;
  }
  .barDownLoadIcon{
    margin: 3px 0;
    padding: 4px 15px;
    background: #34dbbf;
    border-radius: 3px;
    color: #fff;
    line-height: 26px;
    font-size: 16px;
  }
  .ratingNum{
    position: absolute;
    padding: 3px 5px;
    line-height: 10px;
    background-color: #eee;
    color: #333;
    font-size: 9px;
    height: 9px;
    border-radius: 6px;
  }
  .select_bottom{
    border-bottom: 3px solid #34dbbf;
    /*margin-top: -3px;*/
    color: #34dbbf;
  }
  .select_color{
    color: #34dbbf;
  }
  .fixBar{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 10;
  }
  .paddTop{
    padding-top: 47px;
  }
  .wrap_height{
    min-height: 400px;
  }
  @media screen and (min-width: 500px) {
    .wrap_height{
      min-height: 500px;
    }
  }
  .swipe_box{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translate3d;
    z-index: 20;
  }
  .scole-enter-active {
    animation: bounce-in .2s;
  }
  .scole-leave-active {
    animation: bounce-in .2s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

