<template>
<div class="my_package">
  <div class="backBox">
    <div class="fan" @click.stop="backTo"><img src="../../../assets/fan@2x.png">返回</div>
    <div class="backTie">我的礼包</div>
  </div>
  <ul class="page_list">
    <li class="pack_item underline" v-for="pack in packageList">
      <div class="game_detail" @click.stop="goGameDetail(pack.gameId)">
        <div class="game_icon">
          <img :src="puburl + '/' + pack.gameIcon" width="100%">
        </div>
        <div class="game_mes">
          <h3 class="title">《{{pack.gameName}}》&nbsp{{pack.packageName}}</h3>
          <p class="tips">兑换有效期:</p>
          <p class="tips">{{pack.exchangeBeginAt | format}} - {{pack.exchangeEndAt | format}}</p>
        </div>
      </div>
      <div class="game_cdkey">
        <span class="cdkey">激活码: <span class="cdkey_num">{{pack.cdKey}}</span></span>
        <span class="copy" @click.stop="collectPacks()" v-clipboard="pack.cdKey" @success="handleSuccess" @error="handleError">复制</span>
      </div>
    </li>
  </ul>
  <div class="histroy_none" v-if="packageList.length == 0">
    <img src="../../../assets/none.png">
  </div>
</div>
</template>

<script>
import apiPackage from 'api/game'
import { formatDate } from 'js/date'
export default {
  name: 'my-package',
  data(){
    return {
      packageList: [],
      puburl: sessionStorage.getItem('puburl'),
      isNewIn: false
    }
  },
  created(){
    let T;
    T = this.$route.query.supert;
    if(!!T){
      localStorage.setItem('logged-in', 1);
      localStorage.setItem('token', T);
    }
    if(!!this.$route.query.newIn){
      this.isNewIn = true;
    }
    this.getPackageList()
  },
  methods: {
    getPackageList(){
      let obj = {
        code: 1
      }
      apiPackage.myPackages(obj).then(res => {
        if(res.data.code == '0'){
          this.packageList = res.data.data;
        }
      })
    },
    goGameDetail(id){
      this.$router.push(`/gameDel/${id}`);
    },
    collectPacks(){
      this.$toast({
        message: '已复制到粘贴板',
        position: 'bottom',
        duration: 5000
      });
    },
    handleSuccess(){
      // console.log(2)
    },
    handleError(){
      // console.log(1)
    },
    backTo(){ // 返回进来的地方
      if(!!this.isNewIn){
        this.$router.replace({path: '/'})
      }else{
        window.history.back();
      }
    },
  },
  filters: {
    format (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="less" scoped>
@r: 37.5rem;
.my_package{

  .page_list{
    padding: 44px 13px 0;
    .pack_item{
      padding: 20px 0px 15px 0px;
      .game_detail{
        display: flex;
        .game_icon{
          flex: 0 0 60px;
        }
        .game_mes{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 10px;
          .title{
            font-size: 13px;
            color: #333;
          }
          .tips{
            font-size: 10px;
            color: #808080;
          }
        }
      }
      .game_cdkey{
        margin-top: 12px;
        font-size: 0;
        height: 30px;
        border-radius: 3px;
        background-color: #ebebeb;
        line-height: 30px;
        padding-left: 10px;
        .cdkey{
          display: inline-block;
          vertical-align: top;
          height: 100%;
          font-size: 11px;
          color: #666;
          .cdkey_num{
            padding-left: 4px;
            color: #333;
          }
        }
        .copy{
          display: inline-block;
          vertical-align: top;
          float: right;
          height: 100%;
          width: 45px;
          background-color: #4c89f1;
          font-size: 12px;
          color: #fff;
          text-align: center;
          border-radius: 3px;
        }
      }
    }
  }
  .histroy_none{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #f6f6f9;
    img{
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 240px;
      height: 300px;
    }
  }
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
</style>
