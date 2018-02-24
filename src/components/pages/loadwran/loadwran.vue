<template>
<div class="load_wran">
  <div class="wran_top">
    <img src="../../../assets/loadwran.png">
  </div>
  <div class="wran_center">
    <p>{{getloadwrantext}}</p>
  </div>
  <div class="wran_bottom" @click.stop="loadAgain">
    <span>重新加载</span>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'load-wran',
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getloadwranshow', 'getloadwrantext'
    ]),
  },
  methods: {
    loadAgain(){
      window.location.reload();
    }
  }
}
</script>

<style lang="less" scoped>
@r: 37.5rem;
.load_wran{
  position: fixed;
  top: 44/@r;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #fff;
  text-align: center;
  .wran_top{
    width: 138/@r;
    height: 85/@r;
    overflow: hidden;
    margin: 157/@r auto 16/@r auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .wran_center{
    p{
      font-size: 14px;
      line-height: 1;
      color: rgb(173, 173, 173);
    }
  }
  .wran_bottom{
    display: inline-block;
    margin-top: 20/@r;
    height: 30/@r;
    width: 120/@r;
    border-radius: 15/@r;
    background-color: #34dbbf;
    color: #fff;
    font-size: 14px;
    line-height: 30/@r;
  }
}
</style>
