<template>
<div class="pack_wrap">
  <div class="game_item_wrap" @click="showListFn">
    <div class="side_left">
      <div class="img" :class="{'borRad': radius}">
        <img :src="puburl +'/'+ mess.icon">
        <img class="tips" :src="puburl + '/' + mess.cornerImage"  v-if="!!mess.cornerImage">
        <img class="tips" src="../../assets/new@2x.png" v-if="!mess.cornerImage && !!mess.isNew">
      </div>
      <div class="text_pane">
        <p class="title">
          <span class="title_name">{{mess.name}}</span>
        </p>
        <div class="subName">
          <p v-if="typeOne == 1">最新上架<span class="packageCountColor">{{mess.packageCount}}</span>个礼包</p>
          <p v-if="typeOne == 0 || typeOne == 2">{{mess.downloadCount}}次下载&nbsp&nbsp{{mess.size}}{{mess.unit}}</p>
          <!-- <p v-if="typeOne == 0 || typeOne == 2">{{mess.subName}}</p> -->
        </div>
        <p class="title">
          <span v-if="typeOne == 0 || typeOne == 2" class="title_tag" v-for="a in list">{{a}}</span>
        </p>
      </div>
    </div>
    <div class="side_bottom">
      <div class="icon" v-if="typeOne == 1">
        <img src="../../assets/pullup@3x.png" v-if="showList">
        <img src="../../assets/pulldown@3x.png" v-else>
      </div>
      <div class="download" v-if="typeOne == 0 || typeOne == 2">
        <slot name="download">
          <p>下载</p>
        </slot>
      </div>
    </div>
  </div>
  <div class="showList" v-show="showList">
    <slot name='pulldown'>
      
    </slot>
  </div>
</div>
</template>

<script>
  export default {
    name: 'game-item',
    data(){
      return {
        showList: false,
        puburl: sessionStorage.getItem("puburl"),
        list: []
      }
    },
    props: {
      radius: {
        type: Boolean,
        default: true
      },
      typeOne: {
        type: Number,
        default: 0
      },
      mess: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    created(){
      if(!!this.mess.label){
        this.list = JSON.parse(this.mess.label)
      }
    },
    methods: {
      showListFn(){
        if(this.typeOne){
          this.showList = !this.showList;
        }
      },
      setInit(){
        this.showList = false;
      },
      download(){
        this.$emit('download')
      }
    }
  }
</script>

<style lang="less" scoped>
@r: 37.5rem;
.pack_wrap{
  width: 100%;
  .game_item_wrap {
    display: flex;
    font-family: '微软雅黑';
    align-items: center;
    padding: 13/@r 15/@r;
    justify-content: space-between;
    .side_left {
      width: 83%;
      display: flex;
      align-items: center;
      .img {
        position: relative;
        top: 3/@r;
        position: relative;
        img {
          width: 60/@r;
          height: 60/@r;
        }
        .tips{
          position: absolute;
          width: 30/@r;
          height: 30/@r;
          top: 0;
          right: 0px;
          border-radius: 0;
        }
      }
      .borRad{
        img{
          border-radius: 12/@r;
        }
      }
      .text_pane {
        overflow: hidden;
        margin-left: 19/@r;
        padding-right: 19/@r;
        box-sizing: border-box;
        width: 100%;
        .title {
          width: 100%;
          line-height: 1;
          font-size: 0;
          .title_name{
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            color: #333;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            padding: 3/@r 0/@r 0/@r;
            margin-right: 10/@r;
          }
          .title_tag{
            display: inline-block;
            vertical-align: middle;
            color: #34dbbf;
            font-size: 10px;
            border: 1px solid #34dbbf;
            padding: 3/@r 6/@r;
            border-radius: 4/@r;
            margin-right: 7/@r;
          }
        }
        .subName {
          width: 100%;
          overflow: hidden;
          p{
            width: 100%;
            font-size: 10px;
            color: #808080;
            line-height: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            padding-bottom: 10/@r;
            padding-top: 10/@r;
          }
        }
      }
      @media screen and (max-width: 320px){
        .text_pane{
          padding-right: 0;
        }
      }
    }
    .side_bottom{
      .icon {
        overflow: hidden;
        width: 20/@r;
        height: 20/@r;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .download {
        height: 23/@r;
        min-width: 44/@r;
        font-size: 12px;
        border: 1px solid #34dbbf;
        color: #34dbbf;
        padding: 3/@r 4/@r;
        border-radius: 5/@r;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
