<template>
<div class="histroy_wrap">
  <back-to title="浏览记录"></back-to>
  <mt-navbar v-model="selected" :fixed="true" class="histroy_line">
    <mt-tab-item id="1">游戏</mt-tab-item>
    <mt-tab-item id="2">礼包</mt-tab-item>
  </mt-navbar>
  <mt-tab-container class="histroy_content" v-model="selected">
    <mt-tab-container-item id="1" v-if="firstTaste.length != 0">
      <div class="package-pane underline" v-for="item in firstTaste" :key="item.id" @click="gameDel(item)">
        <package-item :typeOne="0" :mess="item">
        </package-item>
      </div>
      <div class="histroy_none" v-show="firstTaste.length == 0">
        <img src="../../../assets/none.png">
      </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="2" v-if="activityWelfare.length != 0">
      <div class="package-pane underline" v-for="item in activityWelfare" :key="item.id">
        <package-item :typeOne="1" :mess="item">
        <package-count slot="pulldown" v-for="package1 in item.gamePackages" :key="package1.id" @click.native="goPackageDel(package1)">
           <div slot='title'>
            <p v-text="package1.name"></p>
          </div>
          <div slot='subName'>
            <p>剩余<span class="packageCountColor">{{package1.useAble}}/{{package1.sum}}</span></p>
          </div>
          <div slot="download" class="down_part">
            <span v-if="package1.status == 1">已领取</span>
            <span v-else-if="package1.status == 0 && package1.useAble != 0">领取</span>
            <span v-else-if="package1.status == 0 && package1.useAble == 0" class="count_none_color">已领完</span>
          </div>
        </package-count>
       </package-item>
      </div>
      <div class="histroy_none" v-show="activityWelfare.length == 0">
        <img src="../../../assets/none.png">
      </div>
    </mt-tab-container-item>
  </mt-tab-container>
</div>
</template>

<script>
import packageItem from 'components/common/packageitem'
import packageCount from 'components/common/packagecount'
import gameMsg from "api/game"
import {mapActions, mapGetters} from "vuex"
import * as scrollTop from "js/scrollTop"
export default {
  name: 'histroy',
  data(){
    return {
      selected: '1',
      activityWelfare: [],
      firstTaste: [],
      puburl: sessionStorage.getItem("puburl")
    }
  },
  async created(){
    await this.getHistroyPack();
    await this.getHistroyGame();
    this.selected = this.getSelectPartHistroy;
    this.$nextTick(() => {
      if(this.selected == '1'){
        scrollTop.getTop('.HISTROY-WRAP1');
      }else{
        scrollTop.getTop('.HISTROY-WRAP2');
      }
    })
  },
  computed:{
    ...mapGetters(['getSelectPartHistroy']),
  },
  watch: {
    'selected'(f,n){
      this.selectPartHistroy(f)
      if(f == '1'){
        scrollTop.getTop('.HISTROY-WRAP1');
      }else{
        scrollTop.getTop('.HISTROY-WRAP2');
      }
    },
  },
  methods: {
    ...mapActions(['selectPartHistroy']),
    // 获取浏览记录
    getHistroyPack(){
      let id = {
        type: 1
      }
      return gameMsg.hotDown(id).then((res) => {
        if(res.data.code == '0'){
          this.activityWelfare = res.data.data;
        }else{
          this.$toast(res.data.userMessage);
        }
      })
    },
     // 获取浏览记录
    getHistroyGame(){
      let id = {
        type: 0
      }
      return gameMsg.hotDown(id).then((res) => {
        if(res.data.code == '0'){
          this.firstTaste = res.data.data;
        }else{
          this.$toast(res.data.userMessage);
        }
      })
    },
    // 下载游戏
    device(item){
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        (item.iosUrl) ? window.location.href = item.iosUrl : this.$toast('该游戏暂无ios版本'); 
      } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
        (!!item.iosUrl) ? window.location.href = item.androidUrl : this.$toast('该游戏暂无安卓版本');
      } else { //pc
        window.location.href = item.androidUrl;
      };
    },
    // 游戏详情
    gameDel(item){
      scrollTop.setTop('.HISTROY-WRAP1');
      let id = item.id;
      this.$router.push(`/gameDel/${id}`);
    },
    // 礼包详情
    goPackageDel(item){
      scrollTop.setTop('.HISTROY-WRAP2');
      let id = item.id;
      this.$router.push({path: `/packageDel?packageId=${id}`});
    },
  },
  components: {
    'package-item': packageItem,
    'package-count': packageCount
  }
}
</script>

<style lang="less" scoped>
.histroy_wrap{
  width: 100%;
  padding-top: 44px;
}
.histroy_content{
  margin-top: 48px;
}
.mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
  color: #34dbbf;
}
.mint-tab-item-label{
  color: #666;
}
.histroy_none{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #f6f6f9;
}
.histroy_none img{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 300px;
}
.down_part{
  span{
    display: inline-block;
    height: 23px;
    min-width: 44px;
    font-size: 12px;
    border: 1px solid #34dbbf;
    color: #34dbbf;
    padding: 3px 4px;
    border-radius: 5px;
    line-height: 23px;
    text-align: center;
  }
  .count_none_color{
    border: 1px solid #cbcbcb;
    color: #cbcbcb;
  }
}
@media screen and (min-width: 500px) {
  .histroy_wrap, .mint-navbar{
    max-width: 680px;
    margin: 0 auto;
  }
}
.histroy_line{
  top: 44px !important;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.2);
}
</style>
