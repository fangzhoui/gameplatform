<template>
<div class="complaint_page">
  <div class="backBox">
    <div class="fan" @click.stop="backTo"><img src="../../assets/fan@2x.png">返回</div>
    <div class="backTie">投诉</div>
  </div>
  <div class="rating_item underline" ref="ratingItem">
    <div class="rating_top">
      <div class="avatar_wrap">
        <img :src="puburl + '/' + rating.avatar" width="100%" height="100%" v-if="rating.avatar">
        <img src="../../assets/mine.png" width="100%" height="100%" v-else>
      </div>
      <div class="avatar_name">
        {{rating.userName}}
      </div>
    </div>
    <div class="rating_content rating_all" ref="ratingContent">
        {{rating.content}}
    </div>
  </div>
  <mt-radio title="投诉说明" align="right" v-model="value" :options='options' class="underline">
  </mt-radio>
  <div class="complaint_desc">
    <div class="title">补充说明</div>
    <textarea class="content" @keyup="textLenFn" ref="ratingContent" v-model="ratingContent" maxLength="150" placeholder="请输入补充说明（可不填）"></textarea>
    <span class="text_len">{{textLen}}/150</span>
    <button class="btn" @click="submitFn">提交</button>
  </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import feedapi from 'api/feedlist'
export default{
  name: 'complaint',
  data(){
    return{
      ratingContent: '',
      defaultText: '回复',
      puburl: sessionStorage.getItem("puburl"),
      rating: {},
      value: '',
      options: [],
      textLen: 0,
      showTextFn: true
    }
  },
  computed: {
    ...mapGetters([
        'getratingtext', 'getratingTextShow', 'getratingTextShow', 'getRatingType', 'getGameName'
      ]),
  },
  created(){
    this.rating = this.getratingtext;
    let obj = document.body || document.documentElement;
    obj.style.height = '100%';
    obj.style.overflow = 'hidden';
    this.getOption();
  },
  methods: {
    ...mapActions(['complaintShow', 'titleShow', 'set_feed']),
    backTo(){
      this.titleShow(true);
      this.complaintShow(false);
      this.set_feed(false);
    },
    textLenFn(){
      this.textLen = this.$refs.ratingContent.value.length;
      if(this.textLen >= 150 ){
        if(this.showTextFn){
          this.$toast({
          message: '最多可输入150字',
          duration: 3000
        });
        setTimeout(() => {
          this.showTextFn = true;
        }, 3000)
        }
      this.showTextFn = false;
      }
    },
    submitFn(){
      let _self = this;
      let obj = {};
      if(JSON.stringify(this.rating) != '{}'){
        obj.toUid = this.rating.uid;
        obj.linkType = this.rating.linkType;
        obj.linkId = this.rating.linkId;
        obj.complaintId = Number(this.value);
        obj.commentId = this.rating.id;
        obj.linkName = this.getGameName;
        if(!!this.ratingContent.trim()){
          obj.content = this.ratingContent;
        }
      }
      feedapi.insertComplaint(obj).then((res) => {
        if (res.data.code == '0') {
          this.$toast('提交成功');
          this.titleShow(true);
          this.complaintShow(false);
          this.set_feed(false);
        } else {
          this.$toast(res.data.userMessage);
        }
      })
    },
    getOption(){ // 获取选项
      let obj = {
        type: this.getRatingType
      }
      feedapi.optionsList(obj).then((res) => {
        if (res.data.code == '0') {
          res.data.data.sort((a, b) => {
            return b.weight - a.weight
          })
          res.data.data.forEach((item) => {
            let obj = {
              label: item.content,
              value: item.id.toString(),
            }
            this.options.push(obj)
          });
          this.value = res.data.data[0].id.toString();
        } else {
          this.$toast(res.data.userMessage);
        }
      })
    }
  },
  destroyed(){
    let obj = document.body || document.documentElement;
    obj.style.height = '';
    obj.style.overflow = '';
  }
}
</script>

<style lang="less" scoled>
.complaint_page{
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: scroll;
  background: #fff;
  padding: 13px;
  box-sizing: border-box;
  z-index: 999;
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
    z-index: 9999;
    .fan {
      margin-left: 14px;
      img {
        position: relative;
        top: 2px;
        margin-right: 11px;
        width: 8px;
        height: 14px;
      }
    }
    .backTie {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
    }
  }
  .rating_item{
    padding-top: 44px;
    margin-bottom: 10px;
    padding-bottom: 13px;
    .rating_top{
      margin-bottom: 10px;
      .avatar_wrap{
        display: inline-block;
        vertical-align: middle;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        font-size: 0;
        border: 2px solid #eee;
        overflow: hidden;
      }
      .avatar_name{
        display: inline-block;
        vertical-align: middle;
        font-size: 13px;
        line-height: 30px;
        padding-left: 0px;
        color: #333;
        font-weight: bold;
      }
    }
    .rating_content{
      font-size: 12px;
      color: #666;
      line-height: 1.5;
      text-align: justify;
    }
    .rating_all{
      overflow: hidden; 
      text-overflow: ellipsis;
      display: -webkit-box; 
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .complaint_desc{
    padding: 15px 0px;
    .title{
      font-size: 13px;
      /*margin-left: -7px;*/
      color: #666;
      margin-bottom: 13px;
    }
    .content{
      width: 100%;
      height: 104px;
      border: none;
      outline: none;
      resize: none;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1.5;
      padding: 10px;
      background: #f5f5f5;
    }
    .btn{
      float: right;
      width: 100%;
      height: 40px;
      background: #34dbbf;
      /*opacity: 0.5;*/
      color: #fff;
      font-size: 15px;
      border: none;
      border-radius: 5px;
      letter-spacing: 8px;
    }
    .text_len{
      display: inline-block;
      font-size: 12px;
      color: #333;
      height: 12px;
      line-height: 1;
      margin-bottom: 10px;
    }
  }
}
.mint-cell{
  height: 48px !important;
}
.mint-radiolist-label{
  padding: 0 !important;
}
.mint-radio-label{
  margin-left: 0 !important;
  margin-right: 23px !important;
}
.mint-cell-wrapper{
  font-size: 15px !important;
  background: none !important;
  padding: 10px 0 !important;
}
.mint-checklist-label{
  padding: 0 !important;
}
.mint-radiolist-title{
  margin: 0 !important;
}
.mint-cell:last-child{
  background: none !important;
}
.mint-radio-input:checked + .mint-radio-core{
  background-color: #34dbbf !important;
  border-color: #34dbbf !important;
}
@media screen and (min-width: 500px) {
    .rating_box{
      width: 680px;
      left: 50%;
      transform: translateX(-50%);
    }
}
</style>


