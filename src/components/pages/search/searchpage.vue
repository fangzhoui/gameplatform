<template>
  <div class="search_page">
    <back-to title="搜索"></back-to>
    <mt-search autofocus v-model="value" cancel-text="取消" placeholder="搜索你想搜索的游戏">
      <mt-cell v-for="item in newArr" :key="item.id" :title="item.name" @click.native="goGameDel(item.id)"></mt-cell>
    </mt-search>
    <div class="search_list_wrap" v-show="!value">
      <search-list :title="title1" :list="list1" class="marB" v-if="list1.length>0"></search-list>
      <search-list :title="title2" :list="list2" v-if="list2.length>0"></search-list>
    </div>
  </div>
</template>


<script>
import searchMsg from 'api/game'
import searchList from 'components/common/searchList'
import backTo from  'components/common/backTo'
export default {
  name: 'search',
  data(){
    return {
      value: '',
      result: [],
      newArr: [],
      title1: '热门搜索',
      title2: '热门下载',
      list1: [],
      list2: []
    }
  },
  created(){
    let _self = this;
    if (sessionStorage.getItem("hotList")) {
      _self.list1 = JSON.parse(sessionStorage.getItem("hotList"));
    } else {
      let a = {type: 0};
      searchMsg.hotDown(a).then((res) => {
        if(res.data.code == '0'){
          _self.list1 = [...res.data.data];
          if(_self.list1.length >= 6){
            _self.list1 = _self.list1.slice(0, 6);
          }
          sessionStorage.setItem("hotList", JSON.stringify(_self.list1));
        }else{
          _self.$toast(res.data.userMessage);
        }
      })
    }
    if (sessionStorage.getItem("hotDown")) {
      _self.list2 =  JSON.parse(sessionStorage.getItem("hotDown"));
    } else {
      searchMsg.gameTop6().then((res) => {
        if(res.data.code == '0'){
          _self.list2 = [...res.data.data];
          sessionStorage.setItem("hotDown", JSON.stringify(_self.list2));
        }else{
          _self.$toast(res.data.userMessage);
        }
      })
    }
  },
  mounted(){
    let _self = this;
    if (sessionStorage.getItem("allGameList")) {
      _self.result =  JSON.parse(sessionStorage.getItem("allGameList"));
    } else {
      searchMsg.gameList().then((res) => {
        if(res.data.code == '0'){
          _self.result = [...res.data.data];
          sessionStorage.setItem("allGameList", JSON.stringify(_self.result));
        }else{
          _self.$toast(responce.data.userMessage);
        }
      })
    }
  },
  methods: {
    goGameDel(id){
      this.$router.push({path: `/gameDel/${id}`});
    },
    filterResult(){
      let _self = this;
      _self.newArr = [];
      let tepArr = this.result;
      tepArr.filter((v, i) => {
        let value = v.name;
        if(new RegExp(_self.value).test(value)){
          _self.newArr.push(v)
        }
      })
      return _self.newArr;
    }
  },
  watch: {
    'value'(){
      this.filterResult()
    }
  },
  components: {
    'search-list': searchList,
    'back-to': backTo
  }
}
</script>

<style lang="less" scoped>
.search_page {  
  height: 100%;
  width: 100%;
  padding-top: 34px;
  box-sizing: border-box;
  position: relative; 
}
.search_list_wrap{
  position: absolute;
  top: 104px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}
.marB{
  margin-bottom: 30px;
}
@media screen and (min-width: 500px) {
  .search_page {
    max-width: 680px;
    margin: 0 auto;
  }
  .search_list_wrap{
    width: 680px;
    margin: 0 auto;
  }
}
</style>
