<template>
  <div class="information_box">
    <back-to title="编辑个人资料" @saveFn="saveInfoFn" right="完成"></back-to>
    <ul class="information_list" v-if="!showInput">
      <li class="information_item" @click.stop="uploadFn">
        <div class="information_wrap underline">
          <div class="information_name">头像</div>
          <div class="information_mes" id="pickfiles">
            <img class="icon" id="icon" ref="icon" src="../../../assets/mine.png" alt="用户默认头像" v-if="!userIconShow">
            <img class="icon" ref="icon" :src="puburl + '/' + userIcon" alt="用户头像" v-else>
            <img class="arrow" src="../../../assets/arrow@2x.png">
          </div>
        </div>
      </li>
      <li class="information_item" @click.stop="changeName(0, userName)">
        <div class="information_wrap underline">
          <div class="information_name">昵称</div>
          <div class="information_mes">{{userName}}<img class="arrow" src="../../../assets/arrow@2x.png"></div>
        </div>
      </li>
      <li class="information_item">
        <div class="information_wrap underline" @click.stop="showSexFn">
          <div class="information_name">性别</div>
          <div class="information_mes"><span class="information_mes_box">{{sex}}</span><img class="arrow" src="../../../assets/arrow@2x.png"></div>
        </div>
      </li>
      <li class="information_item" @click.stop="changeName(1, userDesc)">
        <div class="information_wrap underline">
          <div class="information_name">个人签名</div>
          <div class="information_mes"><span class="information_mes_box">{{userDesc}}</span><img class="arrow" src="../../../assets/arrow@2x.png"></div>
        </div>
      </li>
    </ul>
    <mt-actionsheet
      :actions="actions"
      v-model="changeSexFn">
    </mt-actionsheet>
    <avatar-cropper
      :dataUrl="dateUrl"
      :copperShow="copperShow"
      :labels="labels"
      @base64Url="handleUploading"
      @hideCopper="hideCopper"
    ></avatar-cropper>
    <input ref="upImg" type="file" accept="image/*" style="opacity: 0; width:0; height:0; display:none ">
  </div>

</template>

<script>
  import user from "api/user"
  import AvatarCropper from 'components/common/copper'
  import md from 'js/md5'
  import {base64encode} from 'js/base64encode'
  import VueClipboards from 'vue-clipboards'
  import { dealImage, dataURLtoBlob } from 'js/dealimage'
  import { Indicator } from 'mint-ui'
  export default{
    name: 'information',
    data(){
      return {
        showInput: false,
        puburl: '',
        userIcon: '',
        userName: '',
        userDesc: '',
        changeMsg: '',
        sex: '',
        actions: [{name: '男', method: this.chosFn}, {name: '女',  method: this.chosFn}],
        changeSexFn: false,
        labels: {
          submit: "提交",
          cancel: "取消"
        },
        uptoken: '',
        dateUrl: undefined,
        copperShow: false,
        saveText: '完成',
      }
    },
    methods: {
      hideCopper(){
        this.copperShow = false;
      },
      uploadFn() {
        let _self = this;
        this.$refs.upImg.click();
        this.$refs.upImg.addEventListener('change', () => {
          let reader = new FileReader()
          reader.onload = (e) => {
            _self.dateUrl = e.target.result;
            _self.copperShow = true;
            _self.$refs.upImg.value = '';
          }
          reader.readAsDataURL(this.$refs.upImg.files[0])
        })
      },
      handleUploading(item) {
        let _self = this;
        let a;
        let puburl;
        let uptoken;
        Indicator.open();
        dealImage(item, {width: 120}, function(base){
          a = base;
          if(sessionStorage.getItem('uptoken')){
            puburl = _self.puburl;
            uptoken = sessionStorage.getItem('uptoken');
            _self.putb64(a, puburl, uptoken)
          }else{
            user.getQiniuToken().then((res) => {
              if(res.data.code == '0'){
                _self.uptoken = res.data.data;
                sessionStorage.setItem('uptoken', _self.uptoken)
                puburl = _self.puburl;
                uptoken = _self.uptoken;
                _self.putb64(a, puburl, uptoken)
              }
            })
          }
        })
      },
      putb64(pic, ourl, token){
        let _self = this;
        var pic = pic.split(',')[1];
        var a = 'web' + new Date().getTime()
        var key = md.hex_md5(a) + '.jpg'
        key = base64encode(key)
        // var url = 'http://upload.qiniu.com/putb64/-1/key/' + key;
        var url = 'https://up.qbox.me/putb64/-1/key/' + key;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if (xhr.readyState == 4){
            var res = JSON.parse(xhr.responseText);
            _self.userIcon = res.key;
            _self.saveInfoType();
            Indicator.close();
          }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Authorization", `UpToken ${token}`);
        xhr.send(pic);
      },
      changeName(type, desc){
        this.$router.push({name: 'changeinfo', params: {selectType: type, info: desc}});
      },
      getUsrInfo(){
        let _self = this;
        user.info().then((res) => {
          if (res.data.code == "0") {
            let userInfo = res.data.data;
            _self.userIcon = userInfo.profile.avatar;
            _self.userName = userInfo.nickname;
            (!!userInfo.gender) ? _self.sex = '男' : _self.sex = '女';
            if(userInfo.profile.signature){
              _self.userDesc = userInfo.profile.signature;
            }
          }else {
            _self.$toast(res.data.userMessage);
          };
        })
      },
      saveInfoFn(){
        window.history.back();
      },
      saveInfoType(){
        let a = {
          avatar: this.userIcon
        };
        user.update(a).then((res) => {
          if(res.data.code == '0'){
            this.$toast('修改成功');
          }
        })
      },
      showSexFn(){
        this.changeSexFn = true;
      },
      chosFn(e){
        let obj = {};
        if(e.name == '男'){
          obj.gender = 1
        }else if (e.name == '女'){
          obj.gender = 0
        }
        user.update(obj).then((res) => {
          if(res.data.code == '0'){
            this.sex = e.name;
            this.$toast('修改成功');
          }
        })
      }
    },
    created(){
      let _self = this;
      this.puburl = sessionStorage.getItem("puburl");
      this.getUsrInfo(); 
    },
    computed: {
      userIconShow(){
        if(!!this.userIcon){
          return true
        }else{
          return false
        }
      }
    },
    components: {
      AvatarCropper
    }
  };
</script>

<style scoped>
  .information_box{
    position: fixed;
    left: 0;
    top: 44px;
    bottom: 0;
    width: 100%;
    background-color: #f6f6f9;
    /*overflow: hidden;*/
  }
  @media screen and (min-width: 500px) {
    .information_box{
      max-width: 680px;
      margin: 0 auto;
    }
  }
  .information_list{
    width: 100%;
  }
  .information_item{
    background-color: #fff;
    padding: 0 13px;
    height: 44px;
  }
  .information_wrap{
    height: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    color: #333;
    font-size: 0px;
  }
  .information_name{
    width: 100px;
    font-size: 14px;
    line-height: 44px;
  }
  .information_mes{
    display: inline-block;
    font-size: 14px;
    line-height: 44px;
  }
  .information_mes_box{
    display: inline-block;
    width: 180px;
    font-size: 14px;
    text-align: right;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .information_mes .arrow{
    display: inline-block;
    vertical-align: top;
    width: 8px;
    height: 14px;
    padding-left: 5px;
    margin-top: 14px;
  }
  .information_mes .icon{
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
</style>
