<template>
<div class="histroy_wrap">
  <back-to title="历史反馈"></back-to>
  <mt-navbar v-model="selected" :fixed="true" class="histroy_line">
    <mt-tab-item id="1">投诉反馈<span class="point" v-if="complaintStatus"></span></mt-tab-item>
    <mt-tab-item id="2">建议反馈<span class="point" v-if="suggestionStatus"></span></mt-tab-item>
  </mt-navbar>
  <mt-tab-container class="histroy_content" v-model="selected">
    <mt-tab-container-item id="1">
      <ul class="selected_wrap">
        <li v-for="item in feedList1" @click="complaintFn(item)">
          <feeditem :feedList="item">
            <div slot="title">
              <p class="text_one">你对<span class="title_text">【{{item.toUserName}}】</span>在<span class="title_text">【{{item.linkName}}】</span>中评论的投诉：</p>
              <p class="text_two"><span class="content_text">投诉说明：</span>{{item.complaintContent}}</p>
              <p class="text_content">{{item.content}}</p>
            </div>
          </feeditem>
        </li>
      </ul>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <ul class="selected_wrap">
        <li v-for="item in feedList2" @click="proposalFn(item)">
          <feeditem :feedList="item">
            <div slot="title">
              <p class="text_one">你对千手平台提出的宝贵意见：</p>
              <p class="text_two"><span class="content_text">建议说明：</span></p>
              <p class="text_content">{{item.content}}</p>
            </div>
          </feeditem>
        </li>
        <div class="rating_icon">
          <img src="../../../assets/rating.png" @click.stop="feedAboutFn" width="100%" height="100%">
        </div>
      </ul>
    </mt-tab-container-item>
    <div class="histroy_none" v-if="selected == '1' && feedList1.length==0 || selected == '2' && feedList2.length==0">
      <img src="../../../assets/histroyfeednone.png">
      <p>没有历史反馈哦</p>
    </div>
  </mt-tab-container>
</div>
</template>

<script>
import feeditem from 'components/common/feeditem'
import feedapi from 'api/feedlist'
import {mapActions, mapGetters} from "vuex"
import * as scrollTop from "js/scrollTop"
export default {
  name: 'histroyfeed',
  data(){
    return {
      selected: '1',
      feedList1: [], // 投诉反馈
      feedList2: [], // 建议反馈
      complaintStatus: false,
      suggestionStatus: false
    }
  },
  async created(){
    await this.getfeedList1();
    await this.getfeedList2();
    this.selected = this.getSelectPart;
    this.$nextTick(() => {
      if(this.selected == '1'){
        scrollTop.getTop('.HISTROYFEED-WRAP1');
      }else{
        scrollTop.getTop('.HISTROYFEED-WRAP2');
      }
    })
  },
  watch: {
    'selected'(f,n){
      this.selectPart(f);
      if(f == '1'){
        scrollTop.getTop('.HISTROYFEED-WRAP1');
      }else{
        scrollTop.getTop('.HISTROYFEED-WRAP2');
      }
    }
  },
  computed:{
    ...mapGetters(['getSelectPart']),
  },
  methods: {
    ...mapActions(['selectPart']),
    getfeedList1(){
      return feedapi.complaintList().then((res) => {
        if (res.data.code == '0') {
          this.feedList1 = res.data.data.list;
          if(!!res.data.data.status){
            this.complaintStatus = true
          }else{
            this.complaintStatus = false
          }
        } else {
          this.$toast(res.data.userMessage);
        }
      })
    },
    getfeedList2(){
      return feedapi.suggestionList().then((res) => {
        if (res.data.code == '0') {
          this.feedList2 = res.data.data.list;
          if(!!res.data.data.status){
            this.suggestionStatus = true
          }else{
            this.suggestionStatus = false
          }
        } else {
          this.$toast(res.data.userMessage);
        }
      })
    },
    complaintFn(obj){
      scrollTop.setTop('.HISTROYFEED-WRAP1');
      this.$router.push({path: `/complaintpart?linkId=${obj.id}&linkType=${obj.linkType}`})
    },
    proposalFn(obj){
      scrollTop.setTop('.HISTROYFEED-WRAP2');
      this.$router.push({path: `/proposal?linkId=${obj.id}`})
    },
    feedAboutFn(){
      this.$router.push({path: `/feedback`})
    }
  },
  components: {
    feeditem,
  }
}
</script>

<style lang="less" scoped>
.histroy_wrap{
    width: 100%;
    height: 100%;
    position: relative;
    background: #f6f5fa;
}
.histroy_content{
  margin-top: 85px;
}
.mint-tab-item-label{
  color: #666;
}
.histroy_none{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #f6f6f9;
}
.histroy_none img{
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
}
.histroy_none p{
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #999;
  padding-top: 150px;
}
@media screen and (min-width: 500px) {
  .histroy_wrap, .mint-navbar{
    max-width: 680px;
    margin: 0 auto;
  }
}
.histroy_line{
  box-shadow: 0 0 0 1px rgba(0,0,0,0.2);
  top: 44px !important;
}
.mint-tab-container{
  background: #f6f5fa;
  padding: 0 0 20px 0;
}

.text_one{
  color: #333;
  .title_text{
    color: #f2550f;
  }
}
.text_two{
  color: #666;
  .content_text{
    color: #34dbbf;
  }
}
.text_content{
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rating_icon{
  position: fixed;
  bottom: 20px;
  right: 10px;
  width: 65px;
  height: 65px;
  overflow: hidden;
  img{
    width: 100%;
      height: 100%;
  }
}
.point{
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  margin-left: 4px; 
}
</style>
