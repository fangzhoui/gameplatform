<template>
<div class="rating_wrap">
  <div class="rating_item">
    <div class="rating_top" v-if="ratingText != {}">
      <div class="avatar_wrap">
        <img :src="puburl + '/' + ratingText.avatar" width="100%" height="100%" v-if="!!ratingText.avatar">
        <img src="../../assets/mine.png" width="100%" height="100%" v-else>
      </div>
      <div class="avatar_time" v-if="showBottom">
        <span @click.stop="complaintfn">投诉</span>
        <span>{{time}}</span>
      </div>
      <div class="avatar_name"><span class="name" :class="{'hidden': !!ratingText.toUserName && showBottom}">{{ratingText.userName}}</span><span v-if="!!ratingText.toUserName && showBottom" class="name_text">回复了</span><span v-if="!!ratingText.toUserName && showBottom" class="name hidden">{{ratingText.toUserName}}</span></div>
    </div>
    <div class="rating_content" :class="{'rating_all': showMore}" ref="ratingContent">{{ratingText.content}}</div>
    <div class="show_more" @click="showAll" v-show="showMore">显示全部</div>
  </div>
  <div class="rating_bottom" v-if="showBottom">
    <div class="fabulous" @click="ratingAtFn">
      <span class="icon"><img src="../../assets/pinlun.svg"></span>
      <span class="fabulous_num">{{ratingText.revertTimes || '0'}}</span>
    </div>
    <div class="fabulous" @click="fabulousFn">
      <span class="icon">
        <img src="../../assets/zan.svg" v-if="ratingText.isFavored == 0">
        <img src="../../assets/zan1.svg" v-else>
      </span>
      <span class="fabulous_num">{{ratingText.favorTimes || '0'}}</span>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import feedapi from 'api/feedlist'
import { getDateDiff } from 'js/date'
export default{
  name: 'rating_item',
  data(){
    return {
      showMore: true,
      puburl: sessionStorage.getItem("puburl"),
      ratingText: {},
      time: null
    }
  }, 
  props: {
    rating: {
      type: Object,
      default(){
        return {}
      }
    },
    showBottom: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number,
      default: -1
    }
  },
  created(){
    this.ratingText = this.rating;
    if(!!this.rating.createAt){
      this.time = this.rating.createAt;
      this.time = getDateDiff(this.time);
    }
  },
  mounted(){
    let height = this.$refs.ratingContent.scrollHeight;
    if(height > 72){
      this.showMore = true;
    }else{
      this.showMore = false;
    }
  },
  computed: {
    ...mapGetters([
        'getratingTextShow', 'getComplaint', 'getratingList', 'getRatingCount', 'getRatingType'
      ]),
  },
  methods: {
    ...mapActions(['ratingtext', 'ratingTextShow', 'complaintShow', 'titleShow', 'set_feed']),
    ratingAtFn(){
      let loggedIn = Number(localStorage.getItem('logged-in'));
      if(loggedIn){
        let rating = this.rating;
        this.ratingtext(rating);
        this.titleShow(false);
        this.ratingTextShow(true);
        this.set_feed(true);
        this.$emit('ratingIndex', this.index)
      }else{
        this.$router.push({path: '/login'});
      }
    },
    fabulousFn(){
      let loggedIn = Number(localStorage.getItem('logged-in'));
      if(loggedIn){
        if(!this.ratingText.isFavored){
          let obj = {
            linkType: this.getRatingType
          }
          let gameId = this.$route.query.gameId || this.getStatus(this.$route.path);
          if(!!gameId){
            obj.linkId = Number(gameId);
          }
          let toUid = this.ratingText.uid;
          if(!!toUid){
            obj.toUid = toUid;
          }
          let toCommentId = this.ratingText.id;
          if(!!toCommentId){
            obj.toCommentId = toCommentId;
          }
          feedapi.favorInsert(obj).then((res) => {
            if (res.data.code == '0') {
              this.ratingText.isFavored = 1;
              this.ratingText.favorTimes++;
            } else if(res.data.code == '-1'){
              return;
            }else{
              this.$toast(res.data.userMessage);
            }
          })
        }
      }else{
        this.$router.push({path: '/login'});
      }
    },
    getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
    },
    showAll(){
      this.showMore = false;
    },
    complaintfn(){
      let loggedIn = Number(localStorage.getItem('logged-in'));
      if(loggedIn){
        let rating = this.rating;
        this.ratingtext(rating);
        this.titleShow(false);
        this.complaintShow(true);
        this.set_feed(true);
      }else{
        this.$router.push({path: '/login'});
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rating_wrap{
  position: relative;
}
.rating_item{
  padding: 13px;
  .rating_top{
    margin-bottom: 10px;
    .avatar_wrap{
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 0;
      overflow: hidden;
    }
    .avatar_name{
      display: inline-block;
      vertical-align: middle;
      font-size: 0;
      padding-left: 2px;
      color: #34dbbf;
      font-weight: bold;
      height: 28px;
      line-height: 28px;
      .name_text{
        display: inline-block;
        color: #666;
        padding: 0 5px 0 5px;
        font-size: 13px;
        font-weight: 200;
        width: 40px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .name{
        display: inline-block;
        font-size: 14px;
      }
      .hidden{
        max-width: 85px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .avatar_time{
      position: absolute;
      top: -2px;
      right: 10px;
      span{
        font-size: 10px;
        line-height: 28px;
        color: #999;
        padding-left: 5px;
      }
    }
  }
  .rating_content{
    font-size: 13px;
    color: #333;
    line-height: 1.5;
    word-wrap: break-word;
    /*text-align: justify;*/
  }
  .rating_all{
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:4;
  }
  .show_more{
    display: inline;
    float: right;
    color: #34dbbf;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    padding-top: 5px;
  }
}
.rating_bottom{
  margin-top: 15px;
  height: 30px;
  background: #fafafa;
  line-height: 30px;
  font-size: 0;
  padding-right: 10px;
  box-sizing: border-box;
  .fabulous{
    /*display: inline-block;*/
    float: right;
    padding: 0 8px;
    height: 20px;
    .icon{
      display: inline-block;
      vertical-align: middle;
      width: 14px;
      height: 16px;
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
      color: #666;
      padding-left: 5px;
    }
  }
}
</style>

