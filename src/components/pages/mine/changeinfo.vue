<template>
  <div class="information_box">
    <back-to title="编辑个人资料" @saveFn="saveInfoType" right="保存"></back-to>
    <div class="text">
      <input @keyup="textLenFn" type="text" maxlength="8" ref="changeInput" v-model="changeMsg" v-if="saveType == 0">
      <textarea @keyup="textLenFn" maxlength="25" cols="30" rows="10" ref="changeInput" v-model="changeMsg" v-else></textarea>
      <span class="text_len">{{textLen}}/{{maxLen}}</span>
    </div>
  </div>

</template>

<script>
import user from "api/user"
export default{
  name: 'change-info',
  data(){
    return {
      changeMsg: '',
      saveType: 0,
      maxLen: 0,
      showTextFn: true,
      toastShow: true
    }
  },
  created(){
    this.saveType = this.$route.params.selectType;
    this.changeMsg = this.$route.params.info;
    if(this.saveType == 0){
      this.maxLen = 8
    }else{
      this.maxLen = 25
    }
  },
  computed: {
    textLen(){
      return this.changeMsg.length;
    }
  },
  mounted(){
    this.$refs.changeInput.focus();
  },
  methods: {
    saveInfoType(){
      let type = this.saveType;
      if(!this.changeMsg || this.changeMsg == 'null' ){
        if(this.toastShow){
          this.toastShow = false;
          this.$toast('信息不能为空');
          setTimeout(()=>{
            this.toastShow = true;
          }, 3000)
        }
        this.$refs.changeInput.focus();
        return;
      }
      let a = {};
      switch (type){
        case 0:
          a.nickname = this.changeMsg;
          this.saveUserInfo(a);
          break;
        case 1:
          a.signature = this.changeMsg;
          this.saveUserInfo(a);
          break;
      }
    },
    // 保存修改后的信息
    saveUserInfo(a){
      user.update(a).then((res) => {
        if(res.data.code == '0'){
          this.$toast('修改成功');
          window.history.back();
        }
      })
    },
    textLenFn(){
      let textLen = this.$refs.changeInput.value.length;
      if( textLen >= this.maxLen ){
        if(this.showTextFn){
          this.$toast({
            message: `最多可输入${this.maxLen}字`,
            position: 'top',
            duration: 3000
          });
          setTimeout(() => {
            this.showTextFn = true;
          }, 3000)
        }
        this.showTextFn = false;
      }
    },
  }
}
</script>

<style lang="less" scoped>
   /*输入框*/
  .text{
    position: fixed;
    top: 15px;
    bottom: 0;
    left: 0px;
    right: 0px;
    padding: 0 10px;
    background: #f6f6f9;
    input{
      border: none;
      width: 100%;
      height: 44px;
      font-size: 14px;
      line-height: 44px;
      text-indent: 1em;
      margin-top: 50px;
      box-sizing: border-box;
    }
    textarea{
      border: none;
      width: 100%;
      margin: 50px 0px 0 0px;
      font-size: 14px;
      line-height: 1.5;
      height: 100px;
      box-sizing: border-box;
    }
    .text_len{
      display: inline-block;
      width: 100%;
      font-size: 12px;
      height: 12px;
      line-height: 12px;
      color: #999;
      text-align: right;
    }
  }
</style>
