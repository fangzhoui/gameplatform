<template>
<div class="commid_item">
  <div class="avatar">
    <div class="avatar_wrap">
      <img :src="puburl + '/' + commidDesc.avatar" v-if="!!commidDesc.avatar">
      <img src="../../../assets/mine.png" v-else>
    </div>
  </div>
  <div class="content" @click.stop="replayDesc">
    <h3 class="commid_title">{{commidDesc.userName}}在{{linkType}}<span class="thame">&nbsp&nbsp{{commidDesc.linkName}}&nbsp&nbsp</span>回复了你</h3>
    <p class="commid_reply">{{commidDesc.content}}</p>
    <p class="commid_desc">{{commidDesc.toUserContent}}</p>
  </div>
  <div class="right">
    <span class="point" v-if="!!this.commidDesc.status"></span>
    <div class="commid_time">{{commidDesc.createAt | giffTime}}</div>
    <div class="commid_btn" @click.stop="replayFn">回复</div>
  </div>
</div>
</template>

<script>
import {formatDate, getDateDiff} from 'js/date'
import * as scrollTop from "js/scrollTop"
export default {
  name: 'commid-item',
  data(){
    return{
      puburl: sessionStorage.getItem("puburl"),
      linkType: '游戏'
    }
  },
  props: {
    commidDesc: {
      type: Object,
      default(){
        return{}
      }
    }
  },
  created(){
    this.type()
  },
  methods: {
    type(){
      if(!!this.commidDesc.linkType){
        this.linkType = '文章'
      }else{
        this.linkType = '游戏'
      }
    },
    replayFn(){
      let ratingText = this.commidDesc;
      scrollTop.setTop('.WRAP1');
      this.$router.push({name: 'commid-rating', params: {rating: ratingText}})
    },
    replayDesc(item){
      let id = this.commidDesc.commentId;
      scrollTop.setTop('.WRAP1');
      this.$router.push({path: `/commiddesc?commid=${id}`})
    }
  },
  filters: {
    giffTime(time) {
      return getDateDiff(time)
    }
  },
}
</script>

<style lang="less" scoped>
@r: 37.5rem;
.commid_item{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #fff;
  margin-top: 11/@r;
  .avatar{
    flex: 0 0 75/@r;
    padding: 19/@r 12/@r 0 13/@r;
    box-sizing: border-box;
    .avatar_wrap{
      width: 50/@r;
      height: 50/@r;
      overflow: hidden;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .content{
    flex: 1;
    font-size: 0;
    padding: 19/@r 0 52/@r 0;
    box-sizing: border-box;
    .commid_title{
      font-size: 14/@r;
      color: #333;
      font-weight: normal;
      line-height: 1.5;
      .thame{
        color: #34dbbf;
      }
    }
    .commid_reply{
      font-size: 12/@r;
      color: #393939;
      line-height: 1.2;
      padding-top: 17/@r;
      padding-bottom: 17/@r;
      word-break: break-all;
    }
    .commid_desc{
      width: 229/@r;
      font-size: 10/@r;
      height: 25/@r;
      line-height: 25/@r;
      background-color: #f0f0f0;
      padding: 0/@r 12/@r;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .right{
    position: relative;
    flex: 1;
    font-size: 0;
    padding: 19/@r 13/@r 15/@r 13/@r;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .commid_time{
      font-size: 10/@r;
      line-height: 1;
      color: #d6d6d6;
      white-space: nowrap;
    }
    .commid_btn{
      font-size: 12/@r;
      color: #a5a5a5;
      display: inline-block;
      width: 45/@r;
      height: 20/@r;
      line-height: 20/@r;
      border: 1/@r solid #d8d8d8;
      text-align: center;
      border-radius: 11/@r;
    }
    .point{
      display: inline-block;
      width: 6/@r;
      height: 6/@r;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      top: 5/@r;
      right: 15/@r; 
    }
  }
}
</style>
