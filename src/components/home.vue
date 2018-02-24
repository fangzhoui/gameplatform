<template>
  <div>
    <page-wrap :showHeader="showHeader">
    	<div>
        <keep-alive>
          <components :is="get_page"></components>
        </keep-alive>
    	</div>
    </page-wrap>
  </div>
</template>

<script>
import PageWrap from 'components/common/PageWrap'
import { mapGetters, mapActions } from 'vuex'
import Index from 'components/pages/index/index'
import Classify from 'components/pages/classify/classify'
import Discover from 'components/pages/discover/discover'
import Mine from 'components/pages/mine/mine'
import * as scrolltop from 'js/scrollTop'

export default {
  name: "page-index",
  components: {
    'page-wrap': PageWrap,
    'home': Index,
    'classify': Classify,
    'discover': Discover,
    'mine': Mine
  },
  data(){
  	return {
  		page: 'index-page',
      showHeader: true,
      show: false
  	}
  },
  computed: {
  	...mapGetters([
  		'get_page', 'get_wxstate'
  	]),
  },
  watch: {
    get_page: function(n, o){
      if(n=='mine'){
        this.showHeader = false;
      }else {
        this.showHeader = true;
      }
      window.scrollTo(0, 0);
    }
  },
  mounted(){
    if (this.get_page == 'mine') {
      this.showHeader = false
    }else {
      this.showHeader = true
    }
  }
}
</script>
