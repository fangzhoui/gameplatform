<template>
<div class="histroy_wrap">
  <back-to title="消息中心"></back-to>
  <mt-navbar v-model="selected" :fixed="true" class="histroy_line">
    <mt-tab-item id="1">评论<span class="point" v-if="commidStatus"></span></mt-tab-item>
    <mt-tab-item id="2">站内信<span class="point" v-if="letterStatus"></span></mt-tab-item>
  </mt-navbar>
  <mt-tab-container class="histroy_content" v-model="selected">
    <mt-tab-container-item id="1">
      <ul class="selected_wrap WRAP1">
        <li v-for="item in feedList1">
          <commidItem :commidDesc='item'></commidItem>
        </li>
        <li class="load_more" @click.stop="loadMoreFn" ref="loadMoreDom">{{loadMoreText}}</li>
      </ul>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <ul class="selected_wrap WRAP2">
        <li v-for="item in feedList2" @click="letterDescFn(item)">
          <letterItem :letterDesc='item'></letterItem>
        </li>
      </ul>
    </mt-tab-container-item>
    <div class="histroy_none" v-if="selected == '1' && feedList1.length==0 || selected == '2' && feedList2.length==0">
      <img src="../../../assets/histroyfeednone.png">
      <p>您没有信息哦</p>
    </div>
  </mt-tab-container>
</div>
</template>

<script>
import letterItem from 'components/pages/mine/letteritem'
import commidItem from 'components/pages/mine/commiditem'
import feeditem from 'components/common/feeditem'
import feedapi from 'api/feedlist'
import {mapActions, mapGetters} from "vuex"
import * as scrollTop from "js/scrollTop"

export default {
  name: 'letter',
  data(){
    return {
      selected: '1',
      feedList1: [], // 评论,
      feedList2: [], // 站内信
      commidStatus: false, // 评论状态
      letterStatus: false, // 站内信状态
      page: 1,
      count: 0,
      loadMoreText: '加载更多',
      urlLoad: true,
    }
  },
  async created(){
    this.selected = this.getSelectPartLetter;
    await this.getLetterList();
    await this.getCommentList({page: this.page, pageSize: 10});
    this.$nextTick(() => {
      if(this.selected == '1'){
        scrollTop.getTop('.WRAP1');
      }else{
        scrollTop.getTop('.WRAP2');
      }
    })
  },
  watch: {
    'selected'(f, n){
      this.selectPartLetter(f)
      if(f == '1'){
        scrollTop.getTop('.WRAP1');
      }else{
        scrollTop.getTop('.WRAP2');
      }
    },
    'page'(f, n){
      if(this.count <= this.page * 10){
        this.loadMoreText = '';
        this.$refs.loadMoreDom.style.display = "none";
      }
    }
  },
  computed:{
    ...mapGetters(['getSelectPartLetter']),
  },
  methods: {
    ...mapActions(['selectPartLetter']),
    getLetterList(){
      return feedapi.letterList().then(res => {
        if(res.data.code == '0'){
          this.feedList2 = res.data.data.list;
          if(!!res.data.data.status){
            this.letterStatus = true
          }else{
            this.letterStatus = false
          }
        }
      })
    },
    getCommentList(obj){
      return feedapi.beCommentList(obj).then(res => {
        if(res.data.code == '0'){
          this.count = res.data.data.count;
          if(this.count <= 10){
            this.loadMoreText = ''
          }
          res.data.data.list.forEach((item) => {
            this.feedList1.push(item);
          })
          if(!!res.data.data.status){
            this.commidStatus = true;
          }else{
            this.commidStatus = false;
          }
          this.urlLoad = false;
        }
      })
    },
    letterDescFn(obj){
      scrollTop.setTop('.WRAP2');
      this.$router.push({path: `/letterdesc?linkId=${obj.id}`});
    },
    loadMoreFn(){
      if(this.count >= this.page * 10){
        this.page++;
        let obj = {
          page: this.page,
          pageSize: 10
        }
        this.getCommentList(obj)
      }
    }
  },
  components: {
    letterItem,
    feeditem,
    commidItem,
  },
  destroyed(){
    this.feedList1 = [];
    this.feedList2 = [];
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
  .load_more{
    width: 100%;
    height: 20px;
    font-size: 14px;
    text-align: center;
    line-height: 37px;
    color: #34dbbf;
  }
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
  img{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
  }
  p{
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
