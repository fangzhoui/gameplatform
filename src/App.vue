<template>
  <div id="app">
    <router-view></router-view>
    <iswx-state :iswx="get_wxstate" @click.native="iswxFn"></iswx-state>
    <cdk-item v-if="show_cdk"></cdk-item>
    <loading v-if="getloadingshow"></loading>
    <load-wran v-if="getloadwranshow"></load-wran>
  </div>
</template>

<script>
import iswxstate from 'components/common/iswxstate'
import cdkey from 'components/common/cdkItem'
import { mapGetters, mapActions } from 'vuex'
import loading from 'components/common/loading'
import loadwran from 'components/pages/loadwran/loadwran'
export default {
    name: 'app',
    data(){
      return {
      }
    },
    created(){
      let _self = this;
      window.addEventListener("popstate", function (e) {
        _self.ratingTextShow(false)
        _self.complaintShow(false)
        _self.titleShow(true)
        _self.showswipe(false)
        _self.showloadwran({show: false, text: '加载失败，请重新加载'})
        if(_self.get_feed){
          window.history.forward(1);
          _self.set_feed(false);
        }
      }, false);
      this.getFromkey()
    },
    methods:{
      ...mapActions([
        'set_wxstate', 'ratingTextShow', 'complaintShow', 'titleShow', 'showswipe', 'set_feed', 'showloadwran'
      ]),
      iswxFn(){
        this.set_wxstate(false)
      },
      getFromkey(){
        let a = this.getQueryString('fromKey');
        if(!!a){
          sessionStorage.setItem('fromKey', a);
        }else{
          sessionStorage.setItem('fromKey', 'webapp');
        }
      },
      getQueryString(name){
        let reg = new RegExp("(^|&?)"+ name +"=([^&]*)(&|$)");
        let r = window.location.href.match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      }
    },
    computed: {
      ...mapGetters([
        'get_page', 'get_wxstate', 'getratingTextShow', 'get_feed', 'show_cdk', 'getloadingshow', 'getloadwranshow'
      ]),
    },
    components: {
      'iswx-state': iswxstate,
      'cdk-item': cdkey,
      loading,
      'load-wran': loadwran
    }
}
</script>

<style lang="less">
@r: 37.5rem;
#cnzz_stat_icon_1262258787 {
  opacity: 0;
}
a {
  text-decoration: none;
}
.swiper-pagination-bullet {
  width: 6px !important;
  height: 6px !important;
  background: #cdcdcd !important;
  opacity: 1 !important;
}

.swiper-pagination-bullet-active {
  background: #34dbbf !important;
}

html, body, h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  padding: 0;
  line-height: 1;
}
html, body, #app{
  width: 100%;
  height: 100%;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*底部横细线*/
.underline {
  position: relative;
}

.underline:after {
  position: absolute;
  content: '';
  background: #f5f5f5;
  height: 1px;
  width: 100%;
  bottom: 0;
  left: 0;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
.line {
  background: #f5f5f5;
  height: 8px;
  width: 100%;
}
::-webkit-scrollbar{
  width: 0px;
  background-color: transparent;
  display: none;
}
.mint-tab-item-label{
  font-size: 15px;
}
.mint-search{
  height: 100% !important;
}
.mint-searchbar{
  background-color: #34dbbf !important;
}
.mint-searchbar-cancel{
  color: #fff !important;
  font-size: 18px;
}
.mint-navbar .mint-tab-item{
  padding: 13px 0 !important;
  margin: 0 50/@r;
}
.mint-navbar .mint-tab-item.is-selected{
  color: #34dbbf !important;
  border-bottom: 3px solid #34dbbf !important;
  margin-bottom: -3px !important;
}
.mint-search-list{
  padding-top: 80/@r !important;
}
</style>
