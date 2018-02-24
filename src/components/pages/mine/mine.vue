<template>
  <div class="mine_wrap">
    <div class="mine_header">
      <img src="../../../assets/mine_bg.png">
    </div>
    <div class="mine_box">
      <class-ification class="mine_state"  @click.native="gologin">
        <img :src="puburl + '/' + userIcon" alt="用户头像" v-if="!!userIcon">
        <img src="../../../assets/mine.png" alt="用户默认头像" v-else>
        <div slot="txt">
          <p v-if="!logginType">立即登录</p>
          <div class="user_msg" v-else>
            <p>{{userName}}</p>
            <p class="user_signature">{{userSign}}</p>
          </div>
        </div>
      </class-ification>
    </div>
    <div class="body_contain">
      <list-item class="underline" title="浏览记录" @click.native="histroy" v-show="logginType">
        <img src="../../../assets/lljl@2x.png">
      </list-item>
      <list-item class="underline" title="投诉建议" @click.native="feedback" v-show="logginType">
        <img src="../../../assets/feedback.png">
        <span class="point" v-if="complaintStatus"></span>
      </list-item>
      <list-item class="underline" title="我的礼包" @click.native="histroyPackage" v-show="logginType">
        <img src="../../../assets/mypackage.png">
      </list-item>
      <list-item class="underline" title="消息中心" @click.native="letterFn" v-show="logginType">
        <img src="../../../assets/Informations.png">
        <span class="point" v-if="letterStatus"></span>
      </list-item>
      <list-item class="underline" title="密码修改" @click.native="changepassword" v-show="logginType">
        <img src="../../../assets/changepassword.png">
      </list-item>
      <list-item class="underline" title="关于我们" @click.native="about">
        <img src="../../../assets/aboutOur.png">
      </list-item>
      <list-item title="软件下载（下载APP可领取流量红包）" @click.native="version">
        <img src="../../../assets/update.png">
      </list-item>
      <div class="exit" @click="exit" v-show="logginType">
        退出登录
      </div>
    </div>
  </div>
</template>


<script>
  import ListItem from 'components/common/listitem'
  import classification from 'components/common/classification'
  import user from "api/user"
  import gameMsg from "api/game"
  import feedapi from 'api/feedlist'
  import { MessageBox } from 'mint-ui'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "mine-page",
    data(){
      return {
        puburl: sessionStorage.getItem("puburl"),
        userIcon: '',
        logginType: false,
        userName: '',
        userSign: '这家伙很懒呐',
        autoColl: false,
        autoHis: false,
        collList: [],
        hisList: [],
        wxState: false,
        letterStatus: false, // 消息中心状态
        complaintStatus: false // 投诉建议状态
      }
    },
    methods: {
      ...mapActions([
        'set_wxstate'
      ]),
      //登录
      gologin () {
        if(!this.logginType){
          this.$router.push("/login");
        }else{
          this.$router.push("/information");
        }
      },
      //修改密码
      modifypass(){
        this.$router.push("/modifypass");
      },
      //退出登录
      exit () {
        let _self = this;
        MessageBox.confirm('确定要退出吗？').then(()=> {
          user.logout().then((res) => {
            if (res.data.code == "0") {
              localStorage.setItem('logged-in', 0);
              localStorage.removeItem('user');
              _self.logginType = false;
              _self.userIcon = '';
              _self.userName = '';
            }else{
              _self.$toast(res.data.userMessage);
            }
          })
        }).catch(()=> {
          return 
        })
      },
      //帮助中心
      histroy (){
        this.$router.push("/histroy");
      },
      //关于我们
      about (){
        this.$router.push({path: '/aboutwe'});
      },
      feedback(){ // 意见反馈
        this.$router.push({path: '/histroyfeed'});
      },
      letterFn(){
        this.$router.push({path: '/letter'});
      },
      histroyPackage(){
        this.$router.push({path: '/myPackage'});
      },
      // 修改密码
      changepassword(){
        this.$router.push({path: '/changepassword'});
      },
      // 获取用户信息
      getUsrInfo(){
        let _self = this;
        return user.info().then((res) => {
          if (res.data.code == "0") {
            let userInfo = res.data.data;
            _self.userIcon = userInfo.profile.avatar;
            _self.userName = userInfo.nickname;
            if(userInfo.profile.signature){
              _self.userSign = userInfo.profile.signature;
            }
          }else {
            _self.$toast(res.data.userMessage);
          };
        })
      },
      // 最新版本信息
      version(){
        let _self = this;
        let a = {
          fromKey: 'webapp'
        }
        user.version(a).then((res) => {
          if (res.data.code == "0") {
            let downloadNewVersion = res.data.data.downloadUrl;
            _self.device(downloadNewVersion);
          }else {
            _self.$toast(res.data.userMessage);
          };
        })
      },
      // 下载游戏
      device(item){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
          this.$toast('千手app暂无ios版本'); 
        } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
          this.isWeiXin();
          window.location.href = `https://www.5iqianshou.com/middlepage/?fromKey=webapp`;
        } else { //pc
          window.location.href = `https://www.5iqianshou.com/middlepage/?fromKey=webapp`;
        };
      },
      isWeiXin() {
        let weixinDevice = true
        let ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=='micromessenger'){
          weixinDevice = true
        }else {
          weixinDevice = false
        }
        this.set_wxstate(weixinDevice)
      },
      isNoRead(){
        feedapi.userFourStatus().then(res => {
          if(res.data.code == '0'){
            let obj = res.data.data;
            if(!!obj.complaintSuggest){
              this.complaintStatus = true;
            }else{
              this.complaintStatus = false;
            };
            if(!!obj.messageCenter){
              this.letterStatus = true;
            }else{
              this.letterStatus = false;
            }
          }
        })
      }
    },
    created(){
      //如果登录过
      try{
        this.logginType = JSON.parse(localStorage.getItem('logged-in'));
      }catch(err){
        this.logginType = localStorage.getItem('logged-in');
      }
      if(!!this.logginType){
        this.getUsrInfo();
      }
      this.isNoRead();
    },
    components: {
      "list-item": ListItem,
      "class-ification": classification
    }
  }
</script>


<style scoped>
  .mine_wrap{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: #f5f5f5;
    padding-bottom: 54px;
    overflow: scroll;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  .user_msg{
    text-align: center;
  }
  .user_signature{
    color: #999 !important;
    width: 300px !important;
    line-height: 1.5 !important;
    font-size: 11px !important;
  }
  @media screen and (min-width: 500px) {
    .mine_wrap {
      max-width: 680px;
      left: 50%;
      transform: translate(-50%);
    }
    .mine_header img{
     height: 200px;
    }

  }
  .exit {
    margin-top: 30px;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    height: 41px;
    line-height: 41px;
    padding: 0 14px;
    font-family: '微软雅黑';
    font-weight: bold;
    font-size: 13px;
    color: #f11412;
    background: #fff;
  }
  .mine_header {
    height: 160px;
  }
  .mine_header img{
    width: 100%;
  }
  .mine_box{
    width: 93%;
    box-sizing: border-box;
    margin: -50px auto 0;
    height: 100px;
    background: #fff;
    position: relative;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .mine_state{
    position: absolute;
    left: 50%;
    top: -25px;
    transform: translateX(-50%);
  }
  .point{
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 22px;
    right: 30px;
  }
</style>
