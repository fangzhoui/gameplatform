<template>
  <div class="search_list">
    <h3 class="search_title">{{title}}</h3>
    <div class="item_wrap">
      <div class="list_item" v-for="item in list" @click.stop="goGameDel(item.id)">{{item.name}}</div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'search-list',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    list: {
      type: Array,
      default(){
        return [{name: '测试'},{name: '王者联盟'},{name: '王者联盟'},{name: '王者联盟联盟测试踢'},{name: '王者联盟'}]
      }
    }
  },
  methods: {
    goGameDel(id){
      this.$router.push({path: `/gameDel/${id}`});
    }
  }
}
</script>

<style scoped>
.search_list{
  width: 100%;
  height: 100%;
}
.search_title{
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
  padding-left: 3%;
}
.item_wrap{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.list_item{
  width: 28%;
  margin-left: 3.6%;
  height: 35px;
  border: 1px solid #34dbbf;
  border-radius: 5px;
  text-align: center;
  line-height: 35px;
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis;
}
</style>
