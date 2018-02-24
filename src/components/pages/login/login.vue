<template>
  <!--登录页面-->
  <div class="login_box">
    <back-to></back-to>
    <div class="header">
      <div class="login_bg_wrap">
        <img src="../../../assets/login_bg2.png" class="login_bg">
      </div>
      <div class="logo">
        <img  src="../../../assets/logo@3x.png" width="100%" height="100%">
      </div>
    </div>
    <div class="login_inp">
      <div class="login_tel">
        <label><img src="../../../assets/login_user.png"></label>
        <input ref="tel" v-model="tel" type="tel" maxlength="11" placeholder="手机号 / 登录名">
      </div>
      <div class="login_pass">
        <label><img src="../../../assets/login_password.png"></label>
        <input ref="password" class="password_bottom" v-model="password" type="password" placeholder="请输入六位数以上的密码">
        <img v-if="loginImg == true" src="../../../assets/login_no.png" @click="autoImg(1)">
        <img v-if="loginImg == false" src="../../../assets/login_yes.png" @click="autoImg(2)">
      </div>
      <div class="login_an" :class="{'vcodeBox_color':subBacks}" @click="login">登录</div>
      <div class="zhu_an">
        <router-link tag="a" to="/forget">忘记密码</router-link>
        <span></span>
        <router-link tag="a" to="/register">注册账号</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import user from "api/user"
  export default{
    data(){
      return {
        loginImg: true,
        subBack: false,
        tel: "",
        password: ""
      }
    },
    methods: {
      //切换眼睛
      autoImg(autoIndex){
        this.loginImg = !this.loginImg;
        if (autoIndex === 1) {
          this.$refs.password.type = "text"
        } else {
          this.$refs.password.type = "password"
        }
      },
      //登录
      login () {
        let tel = this.tel;
        let password = this.password;
        if (!tel) {
          this.$toast("手机号不能为空");
          this.$refs.tel.focus();
        } else if (!tel.match(/^1[34578]\d{9}$/)) {
          this.$toast("手机号格式不正确");
          this.$refs.tel.focus();
        } else if (!password) {
          this.$toast("密码不能为空");
          this.$refs.password.focus();
        } else if (!password.match(/^[0-9a-zA-Z]\w{5,17}$/)) {
          this.$toast("密码格式不正确");
          this.$refs.password.focus();
        } else {
          //提交登录
          let loginObj = {phone: tel, password: password};
          let _this = this;
          user.loginByPassword(loginObj).then(function (responce) {
            if (responce.data.code == "0") {
              let res = responce.data.data;
              let user = {
                nickname: res.nickname,
                avatar: res.profile.avatar
              }
              localStorage.setItem('logged-in', 1);
              localStorage.setItem('user', JSON.stringify(user));
              // window.vm.$store.commit('SETLOGIN', 1);
              window.history.back();
            } else {
              _this.$toast(responce.data.userMessage);
            };
          });
        }
      },
    },
    computed: {
      subBacks: function () {
        if (this.tel.match(/^1[34578]\d{9}$/) && this.password.match(/^[0-9a-zA-Z]\w{5,17}$/)) {
          return this.subBack = true;
        } else {
          return this.subBack = false;
        }
      }
    }
  };
</script>

<style lang="less" scoped>
@r: 37.5rem;
  .login_box{
    background: #fff;
  }
  /*头部*/
  .header{
    width: 100%;
    height: 200/@r;
    position: relative;
    .login_bg_wrap{
      height: 200/@r;
      padding-top: 158/@r;
      background: url('../../../assets/login_bg3.png') repeat-x;
      background-size: 1px 200/@r;
      box-sizing: border-box;
      .login_bg{
        width: 100%;  
      }
    }
  }
  .logo{
    width: 70/@r;
    height: 70/@r;
    position: absolute;
    top: 65/@r;
    left: 50%;
    transform: translateX(-50%);
  }
  /*表单部分*/
  .login_inp {
    padding-left: 22/@r;
    padding-right: 22/@r;
    margin: 40/@r auto 0;
  }

  @media screen and (min-width: 500px) {
    .login_inp {
      max-width: 680px;
    }
    .header{
      max-width: 680px;
      margin: 0 auto;
    }
    .login_bg{
      height: 200px;
    }
  }

  .login_tel, .login_pass {
    padding-top: 16/@r;
    padding-bottom: 16/@r;
    display: flex;
    align-items: center;
  }
  .login_tel{
    border-bottom: 1/@r solid #dcdcdc;
  }
  /*账号密码字*/
  .login_tel label, .login_pass label {
    width: 3em;
    font-size: 14px;
    color: #333333;
  }

  .login_pass img {
    margin-right: 8/@r;
    width: 19/@r;
    height: auto;
  }

  .login_tel img {
    margin-right: 8/@r;
    width: 19/@r;
    height: auto;
  }

  #tel::-webkit-input-placeholder {
    color: #999999;
  }

  #password::-webkit-input-placeholder {
    color: #999999;
  }

  /*文本框*/
  .login_tel input, .login_pass input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: #999999;
    margin-top: 2/@r;
  }

  .login_an, .zhu_an{
    border-radius: 5/@r;
    width: 100%;
    text-align: center;
    height: 40/@r;
    line-height: 40/@r;
  }

  .login_an {
    background-color: #dbdbdb;
    font-size: 14px;
    color: #ffffff;
    margin-top: 50/@r;
  }
  .zhu_an a{
    display: inline-block;
    vertical-align: middle;
    color: #34dbbf;
    padding: 0 20/@r;
    font-size: 14px;
  }
  .zhu_an span{
    display: inline-block;
    vertical-align: middle;
    width: 1px;
    height: 15/@r;
    background: #34dbbf;
  }

  .forget {
    margin-top: -3/@r;
  }

  .vcodeBox_color {
    background-color: #34dbbf;
  }
</style>
