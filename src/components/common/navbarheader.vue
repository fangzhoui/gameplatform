<template>
  <div>
    <header class="underline">
      <div class="navbar_header">
        <div class="navbar_header_item" :class="{pick_item: (pick==index)}" v-for="(item, index) in gamecate" :key="index" @click="pickItemFn(index)">
          <p>{{item.name}}</p>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: 'navbar-header',
    data(){
      return {
        pick: "0"
      }
    },
    props: {
      gamecate: {
        type: Array
      }
    },
    computed:{
      ...mapGetters([
        'get_nav',
        'get_index',
        'get_page'
      ])
    },
    methods: {
      ...mapActions([
        'set_index'
      ]),
//        切换导航
      pickItemFn(index){
        this.pick = index;
        this.$emit("autoNav",index);
      }
    },
    created(){
      if(this.get_page=='business'){
        if(sessionStorage.getItem("bizind")){
          this.pick = sessionStorage.getItem("bizind");
        }
      }else {
        if(this.get_nav != ""){
          this.pick = this.get_index;
        }else if(this.get_index == 0){
          this.pick = 0;
        }
      }
    }
  }
</script>


<style scoped>

  header {
    height: 37px;
    width: 100%;
    position: relative;
  }

  .navbar_header {
    display: flex;
    width: 100%;
    align-items: center;
    overflow-x: auto;
    position: absolute;
  }

  .navbar_header_item {
    flex-shrink: 0;
    width: 85px;
    height: 34px;
    display: flex;
    text-align: center;
    font-size: 13px;
    align-items: center;
    overflow: auto;
    justify-content: center;
  }

  .pick_item {
    color: #f39700;
    border-bottom: 2px solid #f39700;
  }
</style>
