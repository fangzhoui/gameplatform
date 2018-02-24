<template>
  <div class="live_box">
   <!--头部返回-->
    <back-to :title="packMsg.name"></back-to>
    <!-- 礼包详情 -->
    <div class="pack_count">
      <package-count>
        <div slot="image" v-if="!!packMsg.gameIcon">
          <img :src="puburl + '/' + packMsg.gameIcon">
        </div>
        <div slot='title'>
          <p v-text="packMsg.name"></p>
        </div>
        <div slot='subName'>
          <p>剩余<span class="packageCountColor">{{packMsg.useAble}}/{{packMsg.sum}}</span>个</p>
        </div>
        <div slot='subDel'>
          <p>激活码：&nbsp{{cdkey}}</p>
        </div>
        <div class="down_part" slot="download" @click.stop="collectPacks">
          <span v-if="packMsg.status == 1">已领取</span>
          <span v-else-if="packMsg.status == 0 && packMsg.useAble != 0">领取</span>
          <span v-else-if="packMsg.status == 0 && packMsg.useAble == 0" class="count_none_color">已领完</span>
        </div>
      </package-count>
    </div>
    <div class="line"></div>
    <div class="content underline">
      <h3 class="title">领取期限</h3>
      <p class="text">{{packMsg.receiveBeginAt | formatDate}}&nbsp至&nbsp{{packMsg.receiveEndAt | formatDate}}</p>
    </div>
    <div class="content underline">
      <h3 class="title">礼包内容</h3>
      <p class="text">{{packMsg.subName}}</p>
    </div>
    <div class="content underline">
      <h3 class="title">兑换日期</h3>
      <p class="text">{{packMsg.exchangeBeginAt | formatDate}}&nbsp至&nbsp{{packMsg.exchangeEndAt | formatDate}}</p>
    </div>
    <div class="content underline">
      <h3 class="title">使用方法</h3>
      <p class="text">{{packMsg.usageMethod}}</p>
    </div>
  </div>
</template>


<script>
import packageCount from 'components/common/packagecount'
import gameMsg from 'api/game'
import {formatDate} from 'js/date'
import { mapGetters, mapActions } from "vuex"

export default{
  name: 'packagedel',
  data(){
    return {
      packMsg: {},
      puburl: sessionStorage.getItem("puburl"),
      packageId: '',
      cdkey: '请领取'
    }
  },
  mounted(){
    this.packageId = this.$route.query.packageId;
    this.getContent(this.packageId);
    this.setHistroyInsert(this.packageId);
  },
  methods: {
    ...mapActions([
      'cdk', 'showcdy', 'fromwhere'
    ]),
    getContent(id){
      let packageId = {packageId: id};
      gameMsg.details(packageId).then(res => {
        if (res.data.code == "0") {
          this.packMsg = res.data.data;
          let loggedIn = Number(localStorage.getItem('logged-in'));
          if(!!loggedIn){
            if(!!this.packMsg.cdkey){
              this.cdkey = this.packMsg.cdkey;
            }
          }
        } else {
          this.$toast(res.data.userMessage);
        }
      });
    },
    collectPacks(){
      let loggedIn = Number(localStorage.getItem('logged-in'));
      if(!!loggedIn){
          if(!!this.packMsg.cdkey){
            this.cdk(this.packMsg.cdkey);
            this.showcdy(true);
            this.fromwhere('package');
          }else{
            let pack = {
              gameId: this.packMsg.gameId,
              packageId: this.packMsg.id
            };
            gameMsg.receive(pack).then((res) => {
              if(res.data.code == "0"){
                this.packMsg.cdkey = res.data.data;
                this.cdk(this.cdkey);
                this.showcdy(true);
                this.fromwhere('package');
              }else{
                this.$toast(res.data.userMessage);
              }
            })
          }
        }else{
          this.$router.push({path: 'login'})
        }
    },
     // 插入浏览记录
    setHistroyInsert(packageId){
      let id = {
        linkId: packageId,
        type: 1
      }
      gameMsg.historyInsert(id).then((res) => {});
    },
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:ss')
    }
  },
  components: {
    'package-count': packageCount
  }
}
</script>


<style lang="less" scoped>
  .live_box {
    position: relative;
    margin: 0 auto;
    max-width: 680px;
  }
  /*礼包详情*/
  .pack_count{
    padding-top: 44px;
  }
  .packageCountColor{
    color: #34dbbf;
  }

  .content{
    padding: 20px 13px;
  }
  .title{
    font-size: 13px;
    color: #000;
    padding-bottom: 15px;
    line-height: 1;
  }
  .text{
    font-size: 10px;
    color: #666;
    line-height: 1.5;
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
    .backBox {
      display: flex;
      justify-content: space-between;
      background-color: #34dbbf;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 50%;
      width: 680px;
      transform: translate(-50%);
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #ffffff;
      z-index: 1;
    }
  }
</style>

