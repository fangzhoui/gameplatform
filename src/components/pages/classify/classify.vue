<template>
  <div class="classify_part">
    <div class="topsubject_wrap" v-if="TOPshow">
      <div class="topsubject" v-for="item in topSubject" @click="topsubjectpart(item.id)">
        <img v-fenlei="puburl + '/' + item.backImage">
        <!-- <p v-text="item.name"></p> -->
      </div>
    </div>
    <div class="game_list" v-for="item in gameList" v-if="BOTshow">
      <h3 class="game_title">
        <span class="title_line" :style="{background: item.color}"></span><span class="title_text">{{item.name}}</span><span class="title_line" :style="{background: item.color}"></span>
      </h3>
      <div class="gamelist_wrap">
        <game-item v-for="game in item.games" @click.native="gameDel(game)" :key="game.id">
          <div slot="icon_box" class="icon_box">
            <img v-lazyload="puburl + '/' + game.icon">
            <img class="tips" :src="puburl + '/' + game.cornerImage"  v-if="!!game.cornerImage">
            <img class="tips" src="../../../assets/new@2x.png" v-if="!game.cornerImage && !!game.isNew">
          </div>
          <div slot="name">
            <p v-text="game.name"></p>
          </div>
        </game-item>
        <div class="line"></div>
      </div>
    </div>
    <div class="bottom_px"></div>
  </div>
</template>


<script>
  import gameMsg from "api/game"
  import gameItem from "components/common/gameitem"
  import {mapActions, mapGetters, mapState} from "vuex"
  export default {
    name: 'game-classify',
    data () {
      return {
        puburl: sessionStorage.getItem('puburl'),
        topSubject: [],
        gameList: [],
        TOPshow: true,
        BOTshow: true
      }
    },
    created(){
      let count = 0;
      // 游戏列表
      if (!!sessionStorage.getItem("gameList")) {
        this.gameList = JSON.parse(sessionStorage.getItem("gameList"));
      } else {
        this.loadFn(true)
        gameMsg.categroyGameList().then((res) => {
          if (res.data.code == "0") {
            this.gameList = res.data.data;
            sessionStorage.setItem('gameList', JSON.stringify(this.gameList))
            count++;
            if(count == 2){
              this.$nextTick(() => {
                this.loadFn(false)
              })
            }
          } else {
            count++;
            if(count == 2){
              this.loadFn(false)
            }
            this.$toast(res.data.userMessage);
          }
        });
      }
      // 4大分类
      if (!!sessionStorage.getItem("topSubject")) {
        this.topSubject = JSON.parse(sessionStorage.getItem("topSubject"));
      } else {
        let sect = {section: 'category-top-topic'};
        this.loadFn(true)
        gameMsg.topicList(sect).then((res) => {
          if (res.data.code == "0") {
            this.topSubject = res.data.data;
            sessionStorage.setItem('topSubject', JSON.stringify(this.topSubject))
            count++;
            if(count == 2){
              this.$nextTick(() => {
                this.loadFn(false)
              })
            }
          } else {
            count++;
            if(count == 2){
              this.loadFn(false)
            }
            this.$toast(res.data.userMessage);
          }
        });
      }
    },
    methods: {
      ...mapActions([
        'showloading'
      ]),
      loadFn(obj){
        this.showloading(obj)
      },
      // 游戏详情
      gameDel(item){
        let id = item.id;
        this.$router.push({path: `/gameDel/${id}`});
      },
      // 分类详情
      topsubjectpart(id){
        this.$router.push({path: '/giftcenter', query: {giftId: id}});
      }
    },
    components: {
      "game-item": gameItem
    }
  }
</script>


<style lang="less" scoped>
@r: 37.5rem;
.bottom_px{
  width: 100%;
  padding-bottom: 54/@r;
}
.topsubject_wrap{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 13/@r 13/@r 4/@r 13/@r;
  background: #f5f5f5;
  .topsubject{
    width: 170/@r;
    height: 90/@r;
    text-align: center;
    line-height: 65/@r;
    background: #fff;
    border-radius: 8/@r;
    margin-bottom: 12/@r;
    position: relative;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    p{
      position: absolute;
      width: 100%;
      text-align: center;
      height: 90/@r;
      line-height: 90/@r;
      font-size: 15px;
      z-index: 2;
      color: #fff;
    }
  }
}
.game_list{
  text-align: center;
}
.gamelist_wrap{
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  position: relative;
}
.icon_box{
  position: relative;
  width: 70/@r;
  height: 70/@r;
  left: 50%;
  transform: translateX(-50%);
  .tips{
    position: absolute;
    width: 30/@r;
    height: 30/@r;
    top: 0;
    right: 0/@r;
    border-radius: 0;
  }
}
.game_title{
  color: #333;
  font-size: 0/@r;
  margin: 20/@r 0;
}
.title_line{
  display: inline-block;
  vertical-align: middle;
  width: 20/@r;
  height: 2/@r;
  background: #34dbbf;
}
.title_text{
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  padding: 0 10/@r;
}
</style>
