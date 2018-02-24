<template>
  <div class="game_bottom">
	<div class="header">
		<span class="span_icon_one"></span>
		<span class="span_icon_two"></span>
		<span class="header_title">{{title}}</span>
	</div>
	<ul class="content">
		<li class="content_item" v-for="game in gameDel" :key="game.gameId" @click="goGameDel(game.gameId, $event)">
	        <div class="img_box">
	          <img :src="puburl + '/' + game.icon" width="100%" height="100%">
	          <img class="tips" :src="puburl + '/' + game.cornerImage"  v-if="!!game.cornerImage">
              <img class="tips" src="../../../assets/new@2x.png" v-if="!game.cornerImage && !!game.isNew">
	        </div>
	        <p class="content_text" v-text="game.name"></p>
	    </li>
	</ul>
  </div>
</template>

<script>
export default{
  name: 'gamebottom',
  data(){
  	return{
  		puburl: sessionStorage.getItem('puburl')
  	}
  },
  props: {
  	title: {
  		type: String,
  		default: '同类热门'
  	},
  	gameDel: {
  		type: Array,
  		default(){
  			return []
  		}
  	}
  },
  mounted(){
  },
  methods: {
  	goGameDel(id){
      this.$router.push(`/gameDel/${id}`);
  	}
  }
}
</script>

<style lang="less" scoped>
.game_bottom{
	padding: 15px;
}
.header{
	font-size: 0px;
	height: 40px;
	line-height: 40px;
}
.span_icon_one, .span_icon_two, .header_title{
	display: inline-block;
	vertical-align: middle;
}
.span_icon_one{
	width: 5px;
	height: 12px;
	border-radius: 3px;
	background-color: #c5f30d;
	margin-right: 3px;
}
.span_icon_two{
	width: 5px;
	height: 16px;
	border-radius: 3px;
	background-color: #17eaba;
	margin-right: 8px;
}
.header_title{
	font-size: 13px;
	font-weight: bold;
	color: #000;
}
.content{
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}
.content_item{
    width: 25%;
    height: 90px;
    text-align: center;
}
.img_box{
	padding-bottom: 10px;
	width: 50px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    .tips{
      position: absolute;
      width: 30px;
      height: 30px;
      top: 0;
      right: 0px;
      border-radius: 0;
    }
}
.content_text{
	font-size: 13px;
	color: #333;
	font-weight: bold;
}
</style>



