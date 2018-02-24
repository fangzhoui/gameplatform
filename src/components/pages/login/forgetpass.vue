<template>
  <div class="register_box">
  <!--头部返回-->
    <back-to title="密码找回"></back-to>
    <div class="login_inp">
      <div class="loginBox">
        <label>账号</label>
        <input type="tel" id="tel" ref="tel" v-model="tel" maxlength="11" placeholder="请输入手机号">
      </div>
      <div class="loginBox">
        <label>验证码</label>
        <input type="number" id="vcode" ref="verify" v-model="verify" placeholder="请输入验证码">
        <div class="vcode_box" @click="getRegister" :class="{'vcodeBox_color':vcodeBacks}">{{vcodetxt}}</div>
      </div>
      <div class="loginBox">
        <label>新密码</label>
        <input type="password" ref="password" id="password" v-model="password" placeholder="请输入六位数以上的密码">
        <img v-if="loginImg == true" src="../../../assets/login_no.png" @click="autoImg(1)">
        <img v-if="loginImg == false" src="../../../assets/login_yes.png" @click="autoImg(2)">
      </div>
      <div class="login_an" @click="subforget" :class="{'subBox_color':subBacks}">提交</div>
    </div>
  </div>
</template>

<script>
import user from "api/user"
export default{
  data(){
    return {
      loginImg: true,
      vcodetxt: "获取验证码",
      vcodeBack: false,
      subBack: false,
      time: "60",
      tel: "",
      verify: "",
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
    //获取验证码
    getRegister(){
      let tel = this.tel;
      if (!tel) {
        this.$toast("手机号不能为空");
        this.$refs.tel.focus();
      } else if (!tel.match(/^1[34578]\d{9}$/)) {
        this.$toast("手机号格式不正确");
        this.$refs.tel.focus();
      } else {
        //获取注册验证码
        let vcodeObj = {phone: tel, type: 2};
        let _this = this;
        user.sendMessage(vcodeObj).then(function (responce) {
          if (responce.data.code == 0) {
            _this.$toast("短信发送中...");
            //倒计时
            _this.timeDown();
          } else {
            _this.$toast(responce.data.userMessage);
          }
          ;
        });
      }
      },
//      倒计时
    timeDown () {
      let _this = this;
      if (_this.time > 0) {
        _this.time = _this.time - 1;
        _this.vcodetxt = _this.time + "s";
        setTimeout(_this.timeDown, 1000);
      } else {
        _this.vcodetxt = "获取验证码";
      }
    },
    //提交找回密码
    subforget(){
      let tel = this.tel;
      let verify = this.verify;
      let password = this.password;
      if (!tel) {
        this.$toast("手机号不能为空");
        this.$refs.tel.focus();
      } else if (!tel.match(/^1[34578]\d{9}$/)) {
        this.$toast("手机号格式不正确");
        this.$refs.tel.focus();
      } else if (!verify) {
        this.$toast("验证码不能为空");
        this.$refs.verify.focus();
      } else if (!password) {
        this.$toast("密码不能为空");
        this.$refs.password.focus();
      } else if (!password.match(/^[0-9a-zA-Z]\w{5,17}$/)) {
        this.$toast("密码格式不正确");
        this.$refs.password.focus();
      } else {
        //提交找回
        let forget = {
          phone: tel,
          verify: verify,
          newPassword: password
        };
        let _this = this;
        user.forgetPassword(forget).then(function (responce) {
          if (responce.data.code == "0") {
            let loginObj = {phone: _this.tel, password: _this.password};
            user.loginByPassword(loginObj).then(function (responce) {
              if (responce.data.code == "0") {
                localStorage.setItem('logged-in', 1);
                window.history.go(-2);
              } else {
                _this.$toast(responce.data.userMessage);
              };
            });
          } else {
            _this.$toast(responce.data.userMessage);
          };
        });
      }
    }
  },
  computed: {
    vcodeBacks: function () {
      if (this.tel.match(/^1[34578]\d{9}$/)) {
        return this.vcodeBack = true;
      } else {
        return this.vcodeBack = false;
      }
    },
    subBacks: function () {
      if (this.tel.match(/^1[34578]\d{9}$/) && this.verify && this.password.match(/^[0-9a-zA-Z]\w{5,17}$/)) {
        return this.subBack = true;
      } else {
        return this.subBack = false;
      }
    }
  }
};
</script>

<style scoped>
  /*表单部分*/
  .login_inp {
    box-sizing: border-box;
    position: relative;
    padding: 63px 22px 0 22px;
  }

  @media screen and (min-width: 500px) {
    .login_inp {
      max-width: 680px;
    }
  }

  .loginBox {
    border-bottom: 1px solid #dcdcdc;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
  }

  .loginBox label {
    width: 3.6em;
    margin-right: 27px;
    margin-top: 2px;
    font-size: 14px;
    color: #333333;
  }

  .loginBox input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: #999999;
  }

  .loginBox img {
    margin-right: 8px;
    width: 15px;
    height: 15px;
  }

  #tel::-webkit-input-placeholder {
    color: #999999;
  }

  #vcode::-webkit-input-placeholder {
    color: #999999;
  }

  #password::-webkit-input-placeholder {
    color: #999999;
  }

  /*倒计时框*/
  .vcode_box {
    position: absolute;
    right: 22px;
    background-color: #dbdbdb;
    border-radius: 5px;
    width: 80px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #ffffff;
    margin-top: -4px;
  }

  .vcodeBox_color {
    background-color: #34dbbf;
  }

  .login_an {
    background-color: #dbdbdb;
    font-size: 14px;
    color: #ffffff;
    margin-top: 20px;
    border-radius: 5px;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .subBox_color {
    background-color: #34dbbf;
  }
</style>


