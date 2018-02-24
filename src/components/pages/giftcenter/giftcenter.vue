<template>
<div class="live_part">
  <!--游戏详情页-->
  <back-to :title="topic.name"></back-to>
  <div class="live_box">
    <!-- 内容 -->
    <div class="package-pane">
      <package-item class="underline" v-for="item in gameList.list" :key="item.id" :typeOne="topic.type" @click.native="gameDel(topic, item)" :mess="item">
        <package-count slot="pulldown" v-for="package1 in item.gamePackages" :key="package1.id" @click.native="gameDel(topic.type, item, package1)">
           <div slot='title'>
            <p v-text="package1.name"></p>
          </div>
          <div slot='subName'>
            <p>剩余<span class="packageCountColor">{{package1.useAble}}/{{package1.sum}}</span></p>
          </div>
          <div slot="download" class="down_part">
            <span v-if="package1.status == 1">已领取</span>
            <span v-else-if="package1.status == 0 && package1.useAble != 0">领取</span>
            <span v-else-if="package1.status == 0 && package1.useAble == 0" class="count_none_color">已领完</span>
          </div>
        </package-count>
       </package-item>
    </div>
  </div>
</div>
</template>


<script>
import packageCount from 'components/common/packagecount'
import packageItem from 'components/common/packageitem'
import gameMsg from "api/game"
import * as scrolltop from 'js/scrollTop'
import {mapActions} from "vuex"
export default{
  name: 'giftcenter',
  data(){
    return {
      puburl: sessionStorage.getItem('puburl'),
      gameList: {},
      topic: {},
    }
  },
  created(){
    let  id = {id: this.$route.query.giftId};
    this.loadFn(true)
    gameMsg.topicDetail(id).then((res) => {
      if (res.data.code == '0') {
        this.gameList = res.data.data;
        this.topic = this.gameList.topic;
        this.loadFn(false)
      } else {
        this.showloadwran({show: true, text: '加载失败，请重新加载'})
        this.$toast(res.data.userMessage);
      }
    })
  },
  methods: {
    ...mapActions([
      'showloading', 'showloadwran'
    ]),
    // 礼包详情
    goPackageDel(item, game){
      let id = item.id;
      let gameName = game;
      let obj = document.querySelector('.live_part');
      scrolltop.setTop(obj);
      this.$router.push({path: `/packageDel?packageId=${id}`});
    },
    loadFn(obj){
      this.showloading(obj);
      this.$nextTick(() => {
        let obj = document.querySelector('.live_part');
        scrolltop.getTop(obj);
      })
    },
    gameDel(type, item, pack){
      if(type.type == 2){
        window.location.href = item.redirectUrl;
      }else if(type.type == 1){
        return
      }else{
        let id;
        if(pack){
          id = pack.gameId
        }else{
          id = item.id
        }
        let obj = document.querySelector('.live_part');
        scrolltop.setTop(obj);
        this.$router.push(`/gameDel/${id}`);
      }
    },
  },
  components: {
    'package-count': packageCount,
    'package-item': packageItem
  }
}

</script>

<style lang="less" scoped>
.live_part{
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.live_box {
  position: relative;
  margin: 0 auto;
  max-width: 680px;
}

/*内容*/
.package-pane {
  padding-top: 44px;
  .down_part{
    span{
      display: inline-block;
      height: 23px;
      min-width: 44px;
      font-size: 12px;
      border: 1px solid #34dbbf;
      color: #34dbbf;
      padding: 3px 4px;
      border-radius: 5px;
      line-height: 23px;
      text-align: center;
    }
    .count_none_color{
      border: 1px solid #cbcbcb;
      color: #cbcbcb;
    }
  }
}
.packageCountColor{
  color: #34dbbf;
}
</style>

