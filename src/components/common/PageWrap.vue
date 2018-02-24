<template>
  <div>
    <div class="page_wrap">
      <!-- header -->
      <header class="page_header" v-if='showHeader'>
        <slot name="header">
          <div class="search_pane" @click="gosearch">
            <img class="header_logo" src="../../assets/logo.png">
            <div class="search_inp_pane">
              <div class="search_inp"></div>
              <span class="inp_hint">
								<img src="../../assets/search.png">
								<span>搜索</span>
							</span>
            </div>
          </div>
        </slot>
      </header>
      <!-- body -->
      <section class="page_content" ref="pageContent">
        <slot>
          body
        </slot>
      </section>
      <!-- footer -->
      <footer class="page_footer" v-if="showFooter">
        <slot name="footer">
          <div>
            <mt-tabbar v-model="selected">
              <mt-tab-item id="home" @click.native="pickPage('home')">
                <img v-if="selected=='home'" slot="icon" src="../../assets/home_icon_@3x.png">
                <img v-else slot="icon" src="../../assets/home_icon@3x.png">
                <span class="font_size">首页</span>
              </mt-tab-item>
              <mt-tab-item id="classify" @click.native="pickPage('classify')">
                <img v-if="selected=='classify'" slot="icon" src="../../assets/classify_icon_@3x.png">
                <img v-else slot="icon" src="../../assets/classify_icon@3x.png">
                <span class="font_size">分类</span>
              </mt-tab-item>
              <mt-tab-item id="discover" @click.native="pickPage('discover')">
                <img v-if="selected=='discover'" slot="icon" src="../../assets/discover_icon_@3x.png">
                <img v-else slot="icon" src="../../assets/discover_icon@3x.png">
                <span class="font_size">发现</span>
              </mt-tab-item>
              <mt-tab-item id="mine" @click.native="pickPage('mine')">
                <img v-if="selected=='mine'" slot="icon" src="../../assets/mine_icon_@3x.png">
                <img v-else slot="icon" src="../../assets/mine_icon@3x.png">
                <span class="font_size">我的<span class="point" v-if="status"></span></span>
              </mt-tab-item>
            </mt-tabbar>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import {Tabbar, TabItem} from 'mint-ui'
import {mapActions, mapGetters} from 'vuex'
import feedapi from 'api/feedlist'
export default {
  name: 'page-wrap',
  data(){
    return {
      selected: 'Home',
      status: false
    }
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions([
      'set_page', 'showloadwran'
    ]),
    pickPage(val){
      this.set_page(val);
      this.showloadwran({show: false, text: '加载失败，请重新加载'})
      _czc.push(["_trackEvent", "首页tab", "切换详情TAB", val]);
    },
    //搜索页面
    gosearch(){
      this.$router.push({path: '/search'});
    },
    isNoRead(){
      feedapi.userFourStatus().then(res => {
        if(res.data.code == '0'){
          let obj = res.data.data;
          if(!!obj.complaintSuggest || !!obj.messageCenter){
            this.status = true;
          }else{
            this.status = false;
          };
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'get_page'
    ])
  },
  watch: {
    get_page: function (n, o) {
      this.selected = n;
      if (n == "mine") {
        this.$router.push("/?tabs=3");
      } else if(n=='home') {
        this.$router.push("/?tabs=0");
      }else if(n=='classify'){
        this.$router.push("/?tabs=1");
      }else if(n=='discover'){
        this.$router.push("/?tabs=2");
      }
    }
  },
  created(){
    this.isNoRead();
  },
  mounted(){
    if (this.get_page == 'home') {
      this.selected = "home"
    } else if (this.get_page == 'classify') {
      this.selected = "classify"
    } else if (this.get_page == 'discover') {
      this.selected = "discover"
    } else if (this.get_page == 'mine') {
      this.selected = "mine"
    }
    let tabs = this.$route.query.tabs;
    if(tabs){
      switch(tabs){
        case "0":
          this.set_page('home');
          this.selected = 'home';
          break;
        case "1":
          this.set_page('classify');
          this.selected = 'classify';
          break;
        case "2":
          this.set_page('discover');
          this.selected = 'discover';
          break;
        case "3":
          this.set_page('mine');
          this.selected = 'mine';
          break;
      }
    }else{
      this.set_page('home');
      this.selected = 'home';
    }  
  }
}
</script>


<style lang="less" scoped>

  .page_wrap {
    max-width: 680px;
    margin: 0 auto;
  }

  .page_header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 44px;
    background: #34dbbf;
    z-index: 999;
  }

  .navbar_header {
    position: fixed;
    top: 44px;
    left: 0;
    z-index: 999;
  }

  .page_content {
    padding-top: 44px;
    z-index: 999;
  }

  .page_footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 55px;
    background-color: #d43f33;
    color: #555;
    z-index: 999;
    .font_size{
      font-size: 12px;
      position: relative;
    }
  }

  /*顶部搜索框区域slot*/
  .search_pane {
    background: #34dbbf;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .header_logo {
    height: 28px;
    margin-left: 13px;
  }

  .search_inp {
    height: 25px;
    width: 180px;
    text-align: center;
    border-radius: 5px;
    outline: none;
    border: 1px solid #fafafa;
    margin: 0 12px;
    background: #fff;
  }

  @media screen and (min-width: 330px) {
    .search_inp {
      width: 200px;
    }
  }

  @media screen and (min-width: 345px) {
    .search_inp {
      width: 220px;
    }
  }

  .search_inp_pane {
    position: relative;
  }

  .inp_hint {
    font-size: 11px;
    color: #999999;
    display: flex;
    align-items: center;
    color: #ccc;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .inp_hint img {
    width: 13px;
    height: 13px;
    margin: 0 5px;
  }

  /*底部navbar区域*/
  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: transparent;
    color: #34dbbf;
  }
  
  .search_word {
    color: #000;
  }
  .point{
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: -30px;
    right: -8px;
  }
  @media screen and (min-width: 500px){
    .page_header {
      position: fixed;
      max-width: 680px;
      top: 0;
      left: 50%;
      height: 44px;
      transform: translate(-50%);
      background: #d43f33;
      z-index: 999;
    }
    .page_footer {
      position: fixed;
      max-width: 680px;
      bottom: 0;
      left: 50%;
      height: 55px;
      transform: translate(-50%);
      background-color: #d43f33;
      z-index: 999;
      .font_size{
        font-size: 12px;
      }
    }
  }
</style>
