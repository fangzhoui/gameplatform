<template>
<div class="feedback_wrap">
  <back-to title="意见反馈"></back-to>
  <div class="content">
    <textarea @keyup="textLenFn" class="content_text" ref="feedContent" v-model="feedContent" maxlength="200" placeholder="输入你的建议"></textarea>
    <span class="text_len">{{textLen}}/200</span>
    <div class="img_box">
      <div v-for="(item, index) in get_banner_img">
        <img-card :keys="index" :image="item">
        </img-card>
      </div>
      <add-img-item v-if="get_banner_img.length<3"></add-img-item>
    </div>
  </div>
  <div class="btn_w">
    <button class="submit_bt" @click="submitFn">提交</button>
  </div>
</div>
</template>

<script>
import AddImgItem from 'components/common/AddImgItem'
import ImgCard from 'components/common/ImgCard'
import { mapGetters, mapActions } from 'vuex'
import { MessageBox } from 'mint-ui'
import feedapi from 'api/feedlist'

export default {
  name: 'feedback',
  data(){
    return {
      puburl: sessionStorage.getItem("puburl"),
      feedContent: '',
      textLen: 0,
      showTextFn: true
    }
  },
  computed: {
    ...mapGetters([
      'get_banner_img'
    ])
  },
  methods:{
    ...mapActions([
      'set_banner_img', 'delete_img'
    ]),
    textLenFn(){
      this.textLen = this.$refs.feedContent.value.length;
      if(this.textLen >= 200 ){
        if(this.showTextFn){
          this.$toast({
          message: '最多可输入200字',
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
    deleteItemFn(){
      let _self = this;
      MessageBox.confirm('确定执行此操作?').then(action => {
          this.delete_img(this.keys);
      });
    },
    submitFn(){
      if(!!this.feedContent.trim()){
        let a = {
          content: this.feedContent
        }
        if(this.get_banner_img.length > 0){
          a.image = JSON.stringify(this.get_banner_img)
        }
        feedapi.insertSuggestion(a).then(res => {
          if(res.data.code == '0'){
            MessageBox({
                title: '提交成功',
                message: '感谢您的宝贵建议，关注同名公众号，如果建议被精选，将有机会获得现金红包哦',
                confirmButtonText: '好的'
              }).then(action => {
              this.set_banner_img('clear')
              window.history.back();
            });
          }else{
            this.$toast(res.data.userMessage)
          }
        }) 
      }else{
        this.$toast('意见不能为空');
      }
    }
  },
  components: {
      'add-img-item': AddImgItem,
      'img-card': ImgCard,
  },
}
</script>

<style lang="less">
.feedback_wrap{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #f6f5fa;
  /*头部返回*/
  .content{
    margin-top: 54px;
    padding-bottom: 13px;
    height: 230px;
    background: #fff;
    .content_text{
      width: 100%;
      height: 117px;
      border: none;
      outline: none;
      resize: none;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1.5;
      padding: 10px;
      margin-top: 10px;
      background: #fff;
    }
    .text_len{
      display: inline-block;
      font-size: 12px;
      color: #333;
      height: 12px;
      line-height: 1;
      margin-bottom: 10px;
      width: 100%;
      text-align: right;
      padding-right: 10px;
      box-sizing: border-box;
    }
    .img_box{
      display: flex;
    }
  }
  .btn_w{
    width: 100%;
    display: flex;
    margin-top: 25px;
    justify-content: center;
    .submit_bt{
      width: 90%;
      height: 40px;
      background: #34dbbf;
      letter-spacing: 12px;
      font-size: 15px;
      color: #fff;
      border: none;
      border-radius: 5px;
    }
  }
}
@media screen and (min-width: 500px) {
  .feedback_wrap{
    max-width: 680px;
    margin: 0 auto;
  }
}
.mint-msgbox-message{
  font-size: 13px;
  color: #333;
  line-height: 19px;
}
.mint-msgbox-title{
  font-size: 15px;
  color: #000;
}
.mint-msgbox{
  width: 71% !important;
  border-radius: 10px;
  top: 45% !important;
}
.mint-msgbox-confirm{
  color: #34dbbf;
  font-size: 15px;
  letter-spacing: 3px;
}
.mint-msgbox-cancel{
  font-size: 15px;
  letter-spacing: 3px;
}
.mint-msgbox-content{
  min-height: 19px !important;
}
</style>
