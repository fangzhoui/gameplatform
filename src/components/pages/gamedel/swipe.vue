<template>
  <div class="swipe_box">
    <mt-swipe :auto="0" @change="handleChange" :defaultIndex="index" @click.native="hideSwipe" :continuous="false">
      <mt-swipe-item v-for="(item,id) in swipePic" :key="id"><img :src="puburl + '/' + item" alt=""></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default{
  name: 'swiper',
  data(){
    return{
      puburl: sessionStorage.getItem('puburl'),
    }
  },
  props: ['index', 'swipePic'],
  methods: {
    ...mapActions(["showswipe"]),
    handleChange(index){
      
    },
    hideSwipe(){
      this.showswipe(false)
    }
  }
}
</script>

<style scoped>
.swipe_box{
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  /*padding: 0 10px;*/
  background: #000;
}
.swipe_box img{
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

