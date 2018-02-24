<template>
<div class="letter_item">
  <p class="time">{{ letterDesc.createAt | formatDate}}</p>
  <div class="content">
    <h3 class="letter_title">{{letterDesc.name}}</h3>
    <div class="img_wrap">
      <img v-zhanneixinmoren="puburl + '/' + letterDesc.image">
    </div>
    <p class="letter_subname">{{letterDesc.subName}}</p>
    <span class="point" v-if="!!letterDesc.status"></span>
  </div>
</div>
</template>

<script>
import {formatDate} from 'js/date'
export default {
  name: 'letter-item',
  data(){
    return {
      puburl: sessionStorage.getItem('puburl'),
    }
  },
  props: ['letterDesc'],
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
}
</script>

<style lang="less" scoped>
@r: 37.5rem;
.letter_item{
  width: 100%;
  padding: 20px 15px 0;
  box-sizing: border-box;
  .time{
    font-size: 10px;
    color: #999;
    text-align: center;
    line-height: 10px;
    margin-bottom: 13px;
  }
  .content{
    width: 100%;
    padding: 15px 12px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    position: relative;
    .letter_title{
      font-size: 14px;
      color: #000;
      height: 14px;
      line-height: 14px;
      margin-bottom: 11px;
    }
    .img_wrap{
      width: 100%;
      height: 170px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .letter_subname{
      font-size: 12px;
      color: #666;
      line-height: 1.2;
      margin-top: 15px;
    }
    .point{
      display: inline-block;
      width: 6/@r;
      height: 6/@r;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      top: 10/@r;
      right: 10/@r; 
    }
  }
}
</style>
