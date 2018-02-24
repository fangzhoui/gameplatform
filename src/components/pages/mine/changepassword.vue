<template>
  <!--登录页面-->
  <div class="login_box">
    <back-to></back-to>
    <div class="header">
      <img src="../../../assets/login_bg.png" class="login_bg">
      <div class="logo">
        <img  src="../../../assets/logo@3x.png" width="100%" height="100%">
      </div>
    </div>
    <div class="login_inp">
      <div class="login_tel">
        <label>旧密码:</label>
        <input ref="oldpassword" v-model="oldpassword" type="text" placeholder="请输入旧密码">
      </div>
      <div class="login_pass">
        <label>新密码:</label>
        <input ref="newpassword" v-model="newpassword" type="password" placeholder="请输入新密码">
        <img v-if="loginImg == true" src="../../../assets/login_no.png" @click="autoImg(1)">
        <img v-if="loginImg == false" src="../../../assets/login_yes.png" @click="autoImg(2)">
      </div>
      <div class="login_an" :class="{'vcodeBox_color':subBacks}" @click="login">提交</div>
    </div>
  </div>
</template>

<script>
  import user from "api/user"
  import backTo from  'components/common/backTo'
  export default{
    name: 'changepassword',
    data(){
      return {
        loginImg: true,
        subBack: false,
        oldpassword: "",
        newpassword: ""
      }
    },
    components: {
      'back-to': backTo
    },
    methods: {
      //切换眼睛
      autoImg(autoIndex){
        this.loginImg = !this.loginImg;
        if (autoIndex === 1) {
          this.$refs.newpassword.type = "text"
        } else {
          this.$refs.newpassword.type = "password"
        }
      },
      //登录
      login () {
        let oldpassword = this.oldpassword;
        let newpassword = this.newpassword;
        if (!oldpassword || oldpassword.length<6) {
          this.$toast("密码不能为空");
          this.$refs.oldpassword.focus();
        } else if (!newpassword || newpassword.length<6) {
          this.$toast("请输入6位数以上的密码");
          this.$refs.newpassword.focus();
        } else {
          //提交登录
          let loginObj = {oldPassword: oldpassword, newPassword: newpassword};
          let _this = this;
          user.changePassword(loginObj).then(function (responce) {
            if (responce.data.code == "0") {
              localStorage.setItem('logged-in', 1)
              _this.$toast("修改成功");
              window.history.back();
            } else {
              _this.$toast(responce.data.userMessage);
            };
          });
        }
      }
    },
    computed: {
      subBacks: function () {
        if (this.oldpassword.length >= 6 && this.newpassword.length >= 6) {
          return this.subBack = true;
        } else {
          return this.subBack = false;
        }
      }
    }
  };
</script>

<style scoped>
  .login_box{
    background: #fff;
  }
  /*头部*/
  .header{
    width: 100%;
    height: 200px;
    position: relative;
  }
  .login_bg{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    /*z-index: 5;*/
  }
  .logo{
    width: 70px;
    height: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
  }
  /*表单部分*/
  .login_inp {
    padding-left: 22px;
    padding-right: 22px;
    margin: 40px auto 0;
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
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    align-items: center;
  }
  .login_tel{
    border-bottom: 1px solid #dcdcdc;
  }

  /*账号密码字*/
  .login_tel label, .login_pass label {
    width: 5em;
    font-size: 14px;
    color: #333333;
  }

  .login_pass img {
    margin-right: 8px;
    width: 19px;
    height: auto;
  }

  .login_tel img {
    margin-right: 8px;
    width: 19px;
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
    margin-top: 2px;
  }

  .login_an, .zhu_an{
    border-radius: 5px;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .login_an {
    background-color: #dbdbdb;
    font-size: 14px;
    color: #ffffff;
    margin-top: 50px;
  }
  .zhu_an a{
    display: inline-block;
    vertical-align: middle;
    color: #34dbbf;
    padding: 0 20px;
  }
  .zhu_an span{
    display: inline-block;
    vertical-align: middle;
    width: 1px;
    height: 15px;
    background: #34dbbf;
  }

  .forget {
    margin-top: -3px;
  }

  .vcodeBox_color {
    background-color: #34dbbf;
  }
</style>
