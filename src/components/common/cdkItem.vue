<template>
<div class="cdkey_part">
  <div class="cdkey_box">
    <div class="cdkey_wrap">
      <h3 class="cdkey_title">领取成功</h3>
      <p class="cdk_desc">兑换码已领取，请尽快使用</p>
      <div class="cdk_content">
        <span class="cdy">邀请码：{{get_cdy}}</span>
        <span class="btn" @click.stop="collectPacks()" v-clipboard="get_cdy" @success="handleSuccess" @error="handleError">复制</span>
      </div>
    </div>
    <div class="cdkey_ok" @click.stop="downLoadFn">{{downDesc}}</div>
    <div class="delete" @click.stop="closeCdk">
      <img src="../../assets/close.png">
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import gameMsg from 'api/game'
export default{
  name: 'cdkey-part',
  data(){
    return {
      downDesc: '下载游戏'
    }
  },
  computed: {
    ...mapGetters([
        'get_cdy', 'getFromWhere', 'getGameDel'
      ]),
  },
  created(){
    if(this.getFromWhere == 'package'){
      this.downDesc = '确定'
    }
    if(this.getFromWhere == 'game'){
      this.downDesc = '下载游戏'
    }
  },
  methods: {
    ...mapActions([
      'showcdy', 'set_wxstate', 'setgamedel', 'fromwhere', 'cdk'
    ]),
    collectPacks(){
      this.showcdy(false);
      this.$toast({
        message: '已复制到粘贴板',
        position: 'bottom',
        duration: 5000
      });
    },
    downLoadFn(){
      if(this.getFromWhere == 'game'){
        this.device()
        this.showcdy(false)
      }
      if(this.getFromWhere == 'package'){
        this.showcdy(false)
      }
    },
    closeCdk(){
      this.showcdy(false);
    },
    // 下载游戏
    device(){
      let item = this.getGameDel;
      let type;
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        type = 'ios';
        if(item.iosUrl) {
          window.location.href = item.iosUrl;
          this.downCount(type);
        } else{
          this.$toast('该游戏暂无ios版本');
        } 
      } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
        if(item.androidUrl) {
          type = 'android';
          this.isWeiXin();
          this.downCount(type);
          window.location.href = item.androidUrl;
        }else{
          this.$toast('该游戏暂无安卓版本');
        }
      } else { //pc
        type = 'android';
        this.downCount(type);
        window.location.href = item.androidUrl;
      };
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
    downCount(type){
      let gameId = this.getGameDel.gameId;
      let a = {
        id: gameId,
        deviceType: type
      }
      gameMsg.downloadRecord(a).then((res) => {});
    },
    handleSuccess(){
      // console.log(2)
    },
    handleError(){
      // console.log(1)
    }
  },
  destroyed(){
    this.setgamedel({});
    this.fromwhere('');
    this.cdk('');
  }
}
</script>

<style lang="less" scoped>
@r: 37.5rem;
.cdkey_part{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 1000;
  .cdkey_box{
    position: absolute;
    width: 250/@r;
    border-radius: 8/@r;
    background: #fff;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    .cdkey_wrap{
      padding: 20/@r 25/@r 5/@r;
      .cdkey_title{
        font-size: 15px;
        text-align: center;
      }
      .cdk_desc{
        font-size: 12px;
        color: #000;
        margin-top: 6/@r;
        margin-bottom: 5/@r;
        line-height: 1.5;
        text-align: center;
      }
      .cdk_content{
        font-size: 0;
        width: 100%;
        margin-bottom: 42/@r;
        border-radius: 3/@r;
        overflow: hidden;
        .cdy{
          display: inline-block;
          vertical-align: top;
          width: 155/@r;
          height: 30/@r;
          line-height: 30/@r;
          font-size: 11px;
          color: #666;
          padding: 0 0 0 5/@r;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          background-color: #e5e5e5;
        }
        .btn{
          display: inline-block;
          vertical-align: top;
          width: 45/@r;
          height: 30/@r;
          line-height: 30/@r;
          font-size: 11px;
          color: #fff;
          text-align: center;
          background-color: #34dbbf;
/*          padding: 0 10/@r;*/
          box-sizing: border-box;
        }
      }
    }
    .cdkey_ok{
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 0;
      height: 36/@r;
      line-height: 36/@r;
      font-size: 15px;
      border-top: 1/@r solid #eee;
      color: #34dbbf;
    }
    .delete{
      position: absolute;
      width: 12/@r;
      height: 12/@r;
      right: 8/@r;
      top: 5/@r;
      padding: 8/@r;
      font-size: 0;
      background-size: cover;
      img{
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>

