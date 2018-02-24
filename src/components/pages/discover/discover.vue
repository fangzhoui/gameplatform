<template>
<div class="discover_wrap">
  <ul>
    <li v-for="item in list" @click="godesc(item)">
      <discover-item :listItem="item"></discover-item>
    </li>
  </ul>
</div>

</template>

<script>
import discoverItem from 'components/pages/discover/discoveritem'
import api_discover from 'api/game'
import {mapActions} from "vuex"
export default {
  name: 'game-discover',
  data(){
    return {
      list: []
    }
  },
  created(){
    if (!!sessionStorage.getItem("discover")) {
        this.list = JSON.parse(sessionStorage.getItem("discover"));
    } else {
      this.loadFn(true);
      api_discover.discoverList().then((res) => {
        if(res.data.code == '0'){
          this.list = res.data.data;
          sessionStorage.setItem('discover', JSON.stringify(this.list));
          this.loadFn(false);
        }
      })
    }
  },
  methods: {
    ...mapActions([
      'showloading'
    ]),
    godesc(item){
      let read = {id: item.id};
      api_discover.readRecord(read).then((res) => {})
      let type = item.linkType.toString();
      if(type == '0'){
        this.$router.push({path: `/gameDel/${item.linkId}`});
      }
      if(type == '1'){
        this.$router.push({path: `/articlePart?gameId=${item.id}`});
      }
      if(type == '2'){
        window.location.href = item.linkUrl;
      }
    },
    loadFn(obj){
      this.showloading(obj)
    },
  },
  components: {
    'discover-item': discoverItem
  }
}
</script>

<style lang="less" scoped>
 .discover_wrap{
  padding-bottom: 54px;
 }
</style>
