// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import LazyLoad from 'js/lazyLoad'
import VueClipboards from 'vue-clipboards'
import {drag, faxianyemian, fenlei, fenleiziyemian, jingpingyouxi, shouyebanner, xiuxianicon, youxixiangqingtupian, youqingtuijian, zhanneixinmoren, zhutizhongxin} from 'js/utils'
import backTo from  'components/common/backTo'
import user from 'api/user'

Vue.component('back-to', backTo)

Vue.use(VueClipboards);
Vue.use(LazyLoad);

Vue.directive('faxianyemian', faxianyemian)
Vue.directive('fenlei', fenlei)
Vue.directive('fenleiziyemian', fenleiziyemian)
Vue.directive('jingpingyouxi', jingpingyouxi)
Vue.directive('shouyebanner', shouyebanner)
Vue.directive('xiuxianicon', xiuxianicon)
Vue.directive('youxixiangqingtupian', youxixiangqingtupian)
Vue.directive('youqingtuijian', youqingtuijian)
Vue.directive('zhanneixinmoren', zhanneixinmoren)
Vue.directive('zhutizhongxin', zhutizhongxin)

Vue.directive('drag', drag)

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(Vuex)

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// let loggin;
// try{
// 	loggin = JSON.parse(localStorage.getItem('logged-in'))
// }catch(err){
// 	loggin = localStorage.getItem('logged-in')
// }
// window.vm.$store.commit('SETLOGIN', loggin);
