<template>
<div class="proposal_wrap">
  <back-to title="意见反馈"></back-to>
  <ul class="list">
    <li class="item" v-if="showFn">
      <proposal-item :proplist="list"></proposal-item>
    </li>
  </ul>
  <transition name="scole">
    <div class="swipe_box" v-if="getShowSwipe">
      <swipe :index="getIndex" :swipePic="getImages"></swipe>
    </div>
  </transition>
</div>
</template>

<script>
import proposalItem from 'components/pages/mine/proposalitem'
import feedapi from 'api/feedlist'
import { mapGetters, mapActions } from 'vuex'
import swipe from 'components/pages/gamedel/swipe'
export default {
  name: 'proposal-wrap',
  data(){
    return{
      list: {},
      showFn: false
    }
  },
  components: {
    'proposal-item': proposalItem,
    swipe
  },
  created(){
    let id = this.$route.query.linkId;
    this.getList(id);
  },
  computed: {
    ...mapGetters([
      'getIndex', 'getShowSwipe', 'getImages'
    ]),
  },
  methods: {
    getList(id){
      let obj = {
        id: Number(id)
      }
      feedapi.suggestionDetail(obj).then((res) => {
        if(res.data.code == '0'){
          this.list = res.data.data;
          this.showFn = true;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.proposal_wrap{
  width: 100%;
  height: 100%;
  padding-top: 44px;
  box-sizing: border-box;
  .list{
    width: 100%;
    height: 100%;
    .item{
      width: 100%;
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
.swipe_box{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform: translate3d;
  z-index: 20;
}
.scole-enter-active {
  animation: bounce-in .2s;
}
.scole-leave-active {
  animation: bounce-in .2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
