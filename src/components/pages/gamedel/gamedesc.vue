<template>
    <div class="package-pane">
        <div class="gamedel_wrap" v-if="gameDel.packageCount>0">
          <div class="gamedel_box" @click="hidepackfn">
            <div class="img_box">
              <img class="img_size" src="../../../assets/packagegamedel.png">
            </div>
            <div class="packagetext">
              <p>有<span class="packageCountColor">{{gameDel.packageCount}}</span>个活动礼包可以领取</p>
            </div>
            <div class="icon">
              <img src="../../../assets/pullup@3x.png" v-if="showList">
              <img src="../../../assets/pulldown@3x.png" v-else>
            </div>
          </div>
          <package-count v-show="showList" v-for="(package1, index) in gameDel.packageVOS" :key="package1.id" @click.native="goPackageDel(package1)">
             <div slot='title'>
              <p v-text="package1.name"></p>
            </div>
            <div slot='subName'>
              <p>剩余<span class="packageCountColor">{{package1.useAble}}/{{package1.sum}}</span></p>
            </div>
            <div slot="download" class="down_part">
              <span v-if="package1.status == 1" @click.stop="collectPacks(package1, index)">已领取</span>
              <span v-else-if="package1.status == 0 && package1.useAble != 0" @click.stop="collectPacks(package1, index)">领取</span>
              <span v-else-if="package1.status == 0 && package1.useAble == 0" class="count_none_color">已领完</span>
            </div>
          </package-count>
        </div>
        <div class="line" v-if="gameDel.packageCount>0"></div>
        <imgdesc :gameDel="gameDel"></imgdesc>
        <depictpart :features="gameDel.introduce" v-if="!!gameDel.introduce&&gameDel.introduce!='null'&&gameDel.introduce!='undefined'"></depictpart>
        <depictpart :features="gameDel.features" title="最近新区" v-if="!!gameDel.features&&gameDel.features!='null'&&gameDel.features!='undefined'"></depictpart>
        <gameBottom :gameDel="gameDel.downloadTopVOS" title="同类热门"></gameBottom>
    </div>
</template>

<script>
import packageItem from 'components/common/packageitem'
import packageCount from 'components/common/packagecount'
import imgdesc from 'components/pages/gamedel/imgdesc'
import depictpart from 'components/pages/gamedel/depictpart'
import gameBottom from 'components/pages/gamedel/gamebottom'
import gameMsg from 'api/game'
import { mapGetters, mapActions } from "vuex"
export default{
    name: 'game-desc',
    data(){
        return{
          getpack: '领取',
          loggedIn: 0,
          showList: false
        }
    },
    props: ['gameDel'],
    mounted(){
      if(localStorage.getItem('logged-in')){
        this.loggedIn = Number(localStorage.getItem('logged-in'));
      }else{
        this.loggedIn = 0;
      }
    },
    methods: {
      ...mapActions([
        'cdk', 'showcdy', 'fromwhere', 'setgamedel'
      ]),
      // 礼包详情
      goPackageDel(item){
        let id = item.id;
        this.$router.push({path: `/packageDel?packageId=${id}`});
      },
      collectPacks(obj, index){
        let _self = this;
        let loggedIn = Number(localStorage.getItem('logged-in'));
        if(loggedIn){
          if(obj.cdkey){
            _self.cdk(obj.cdkey);
            _self.showcdy(true);
            _self.fromwhere('game');
            _self.setgamedel(this.gameDel);
          }else{
            let pack = {
              gameId: this.gameDel.gameId,
              packageId: obj.id
            };
            gameMsg.receive(pack).then((res) => {
              if(res.data.code == "0"){
                let cdkey = res.data.data;
                _self.gameDel.packageVOS[index].cdkey = cdkey;
                _self.cdk(obj.cdkey);
                _self.showcdy(true);
                _self.fromwhere('game');
                _self.$set(obj, 'status', '1');
                _self.setgamedel(this.gameDel);
              }else{
                _self.$toast(res.data.userMessage);
              }
            })
          }
        }else{
          this.$router.push({path: '/login'});
        }
      },
      hidepackfn(){
        this.showList = !this.showList
      }
    },
    components: {
      'package-item': packageItem,
      'package-count': packageCount,
      imgdesc,
      depictpart,
      gameBottom
    }
}
</script>

<style lang="less" scoped>
@keyframes mymove{
  0% {
    transform: rotate(0deg);
    
  }
  15%{
    transform: rotate(30deg);
  }
  30% {
    transform: rotate(0deg);
    
  }
  45% {
    transform: rotate(-30deg);
  }
  60% {
    transform: rotate(0deg);
    
  }
  65% {
    transform: rotate(30deg);
  }
  70% {
    transform: rotate(0deg);
    
  }
  75% {
    transform: rotate(-30deg);
  }
  80% {
    transform: rotate(0deg);
    
  }
  85% {
    transform: rotate(30deg);
  }
  90% {
    transform: rotate(0deg);
    
  }
  95% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0deg);
    
  }
}
.img_size{
  border-radius: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
.packageCountColor{
  color: #34dbbf;
}

.gamedel_wrap{
  width: 100%;
  .gamedel_box{
    padding: 13px 15px;
    position: relative;
    .img_box{
      display: inline-block;
      vertical-align: top;
      width: 20px;
      height: 22px;
      animation: mymove 1s infinite linear;
      transform: translate3d(0,0,1px);
      transform-origin: 50% 100%;
    }
    .packagetext{
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      line-height: 20px;
      color: #333;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding: 0px 10px;
      margin-right: 10px;
    }
    .icon{
      position: absolute;
      right: 15px;
      display: inline-block;
      vertical-align: middle;
      width: 22px;
      height: 22px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
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
</style>

