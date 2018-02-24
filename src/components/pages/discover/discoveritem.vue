<template>
<div class="discover_item">
  <div class="header">
    <div class="img_wrap">
      <img :src="puburl + '/' + listItem.icon">
    </div>
    <h3 class="title">{{listItem.name}}</h3>
  </div>
  <div class="content">
    <div class="img_wrap">
      <img v-faxianyemian="puburl + '/' + listItem.cover">
    </div>
    <div class="content_bar">
      <div class="fabulous">
        <span class="icon"><img src="../../../assets/discover_liulan.png"></span>
        <span class="fabulous_num">{{listItem.readTimes || '0'}}</span>
      </div>
      <div class="fabulous">
        <span class="icon"><img src="../../../assets/pinun.png"></span>
        <span class="fabulous_num">{{listItem.commentTimes || '0'}}</span>
      </div>
    </div>
  </div>
  <div class="bottom">{{listItem.subName}}</div>
</div>
</template>

<script>
export default {
  name: 'discover-item',
  data(){
    return {
      puburl: sessionStorage.getItem("puburl"),
    }
  },
  props: {
    listItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  mounted(){
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.discover_item{
  position: relative;
  width: 100%;
  background-color: #fff;
  font-size: 0;
  .header{
    padding: 13px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    .img_wrap{
      flex: 0 0 25px;
      width: 25px;
      height: 25px;
      overflow: hidden;
      border-radius: 6px;
      margin-right: 13px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title{
      flex: 1;
      font-size: 14px;
      line-height: 25px;
      color: #333;
      font-weight: normal;
      word-break: break-all;
    }
  }
  .content{
    width: 100%;
    height: 150px;
    position: relative;
    .img_wrap{
      overflow: hidden;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .content_bar{
      position: absolute;
      bottom: 0;
      height: 20px;
      width: 100%;
      background: rgba(0,0,0,0.2);
       .fabulous{
        float: right;
        padding: 0 13px 0 1px;
        height: 20px;
        line-height: 20px;
        .icon{
          display: inline-block;
          vertical-align: middle;
          width: 12px;
          height: 12px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .fabulous_num{
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: #fff;
          padding-left: 5px;
        }
      }
    }
  }
  .bottom{
    height: 47px;
    line-height: 39px;
    font-size: 13px;
    color: #666;
    width: 100%;
    padding-left: 13px;
    box-sizing: border-box;
    border-bottom: 8px solid #f5f5f5;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>
