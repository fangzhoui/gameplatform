<template>
  <div class="imgdesc">
	<div class="hot_zhu">
	  <div class="hot_tie"><p>游戏详情</p></div>
	  <div class="hot_box" ref="hotBox">
	    <ul class="hot_list" ref="hotList">
	      <li class="hot_jie_img" v-for="(item, index) in images" :key="index" @click="hideImageView(index, $event)">
	        <img v-youxixiangqingtupian="puburl + '/' + item">
	      </li>
	    </ul>
	  </div>
	  <div class="game_desc">
	    <p class="desc_item">分类：<span>{{gameDel.categoryName}}{{gameDel.categoryName}}</span></p>
	    <p class="desc_item padd_left">版本：<span>{{gameDel.version}}</span></p>
	    <p class="desc_item">语言：<span>{{gameDel.language}}</span></p>
	    <p class="desc_item padd_left">更新：<span>{{gameDel.updateAt | formatDate}}</span></p>
	  </div>
	</div>
	<div class="line"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {formatDate} from 'js/date'
export default{
  name: 'imgdesc',
  data(){
    return{
    	puburl: sessionStorage.getItem('puburl'),
    	images: [],
    }
  },
  props: ['gameDel'],
  created(){
    if(!!this.gameDel.images && this.gameDel.images != 'null' && this.gameDel.images != 'undefined'){
      try{
      	this.images = JSON.parse(this.gameDel.images);
      }catch(err){
        this.images = [];
      }
    }
  },
  methods: {
    ...mapActions([
      'setindex', "showswipe"
    ]),
    hideImageView(index){
      this.setindex(index)
      this.showswipe(true)
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
}
</script>

<style scoped>
/*游戏详情*/
  .hot_zhu{
    width: 100%;
    padding: 0 14px;
    box-sizing: border-box;
  }
  .hot_tie {
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #333333;
  }
  
  .hot_box {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .hot_box .hot_list {
    font-size: 0;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .hot_box .hot_jie_img {
    margin-right: 16px;
    display: inline-block;
    width: 193px;
    height: 345px;
    overflow: hidden;
  }

  .hot_jie_img img {
    width: 100%;
    height: 100%;
  }

  .game_desc{
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    padding: 10px 0px 0px 0px;
    font-size: 0;
  }
  .game_desc .desc_item{
    width: 50%;
    float: left;
    font-size: 12px;
    color: #999;
    margin-bottom: 13px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .game_desc .desc_item span{
    color: #666;
    padding-left: 5px;
  }
</style>


