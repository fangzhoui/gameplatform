<template>
<div class="complaint_wrap">
  <div class="backBox">
    <div class="fan" @click="backTo"><img src="../../../assets/fan@2x.png">返回</div>
    <div class="backTie">投诉反馈</div>
  </div>
  <div class="content">
    <div class="top">
      <div class="game_wrap" v-if="list.linkType == 0" @click="gotoFn">
        <div class="img_wrap" v-if="!!list.linkIcon">
          <img :src="puburl + '/' + list.linkIcon">
        </div>
        <p>{{list.linkName}}</p>
        <div class="star_wrap">
          <span class="star_box">
            <star :score="list.gameStar"></star>
          </span>
          <span class="size">{{list.gameSize}}{{list.gameUnit}}</span>
          <span class="download_count">{{list.gameDownloads}}人下载</span>
        </div>
      </div>
      <div class="article_wrap" v-else @click="gotoFn">
        <div class="content">
          <div class="img_wrap" v-if="!!list.linkCover">
            <img :src="puburl + '/' + list.linkCover">
          </div>
          <div class="content_bar">
            {{list.linkSubName}}
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="middel">
      <div class="rating_item underline">
        <div class="rating_top">
          <div class="avatar_wrap" v-if="!!list.toUserAvatar">
            <img :src="puburl + '/' + list.toUserAvatar" width="100%" height="100%">
          </div>
          <div class="avatar_name">
            {{list.toUserName}}
          </div>
        </div>
        <div class="rating_content rating_all" ref="ratingContent">
            {{list.toUserContent}}
        </div>
      </div>
      <div class="complaint_desc">
        <p class="complaint_title">投诉说明</p>
        <div class="complaint_content">
          <p>{{list.complaintContent}}</p>
          <img src="../../../assets/choose.png">
        </div>
      </div>
    </div>
    <div class="bottom" v-if="showList">
      <proposal-item :proplist="list"></proposal-item>
    </div>
  </div>
</div>
</template>

<script>
import proposalItem from 'components/pages/mine/proposalitem'
import feedapi from 'api/feedlist'
import gameMsg from 'api/game'
import star from 'components/common/star'
export default {
  name: 'complaint-wrap',
  data(){
    return{
      list: {},
      puburl: sessionStorage.getItem('puburl'),
      showList: false
    }
  },
  components: {
    'proposal-item': proposalItem,
    'star': star,
  },
  created(){
    let id = this.$route.query.linkId;
    this.getList(id);
  },
  methods: {
    getList(id){
      let obj = {
        id: Number(id)
      }
      feedapi.complaintDetail(obj).then((res) => {
        if(res.data.code == '0'){
          this.list = res.data.data;
          this.showList = true;
        }
      })
    },
    backTo(){
      window.history.go(-1);
    },
    gotoFn(){
      let a = this.list.linkType;
      let id = this.list.linkId;
      if(a == 0){
        this.$router.push({path: `/gameDel/${id}`});
      }else{
        let artId = this.list.linkId;
        this.$router.push({path: `/articlePart?gameId=${artId}`});
      }
    }
  }
}
</script>

<style lang="less" scoped>
.complaint_wrap{
  width: 100%;
  height: 100%;
  padding-top: 44px;
  box-sizing: border-box;
  .content{
    height: 100%;
    width: 100%;
    .top{
      .game_wrap{
        padding: 13px 0 20px 0;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        .img_wrap{
          width: 70px;
          height: 70px;
          border-radius: 12px;
          margin: 0 auto 10px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        p{
          font-size: 16px;
          color: #333;
        }
        .star_wrap{
          font-size: 0;
          color: #333;
          margin-bottom: 0px;
          margin-top: 10px;
          .star_box{
            display: inline-block;
            vertical-align: top;
            padding-right: 13px;
          }
        }
        .size{
          display: inline-block;
          vertical-align: top;
          font-size: 10px;
          padding-right: 13px;
        }
        .download_count{
          display: inline-block;
          vertical-align: top;
          font-size: 10px;
        }
      }
      .article_wrap{
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
            font-size: 14px;
            color: #fff;
            line-height: 20px;
            text-indent: 5px;
          }
        }
      }
    }
    .middel{
      font-size: 0;
      .rating_item{
        padding: 15px 15px 13px 15px;
        .rating_top{
          margin-bottom: 9px;
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
            color: #34dbbf;
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
        font-size: 0px;
        padding: 15px;
        .complaint_title{
          font-size: 13px;
          color: #666;
        }
        .complaint_content{
          position: relative;
          margin-top: 20px;
          margin-bottom: 0px;
          p{
            font-size: 15px;
            color: #333;
            line-height: 21px;
            padding-right: 30px;
          }
          img{
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            width: 21px;
            height: 21px;
          }
        }
      }
    }
    .bottom{

    }
  }
}

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
  z-index: 1;
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
</style>
