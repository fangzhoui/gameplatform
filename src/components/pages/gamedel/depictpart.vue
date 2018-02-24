<template>
  <div class="depictpart_wrap">
	<div class="depictpart_box">
		<div class="header">
			<span class="span_icon_one"></span>
			<span class="span_icon_two"></span>
			<span class="header_title">{{title}}</span>
		</div>
		<div class="content" :class="{'content_ells': showMore == true}" v-html="desc" ref="content">
		</div>
		<div class="bottom" @click="showAll" v-show="showMore == true">
			显示全部
		</div>
	</div>
	<div class="line"></div>
  </div>
</template>

<script>
export default{
  name: 'depictpart',
  data(){
    return{
    	showMore: true,
    	desc: ''
    }
  },
  props: {
  	features:{
  		type: String,
  	},
  	title: {
  		type: String,
  		default: '游戏介绍'
  	}
  },
  created(){
  	let re = /\r\n/g;
  	if(!!this.features && this.features != 'null' && this.features != 'undefined'){
	  	this.desc = this.features.replace(re, '<br>');
  	}
  },
  mounted(){
  	let height = this.$refs.content.scrollHeight;
  	if(height > 72){
  		this.showMore = true;
  	}else{
  		this.showMore = false;
  	}
  },
  methods: {
  	showAll(){
  		this.showMore = false;
  	}
  }
}
</script>

<style lang="less" scoped>
.depictpart_wrap{
	.depictpart_box{
		padding: 15px 15px 15px 15px;
		.header {
			font-size: 0px;
			height: 40px;
			line-height: 40px;
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
		}
		.content{
			font-size: 13px;
			color: #666;
			line-height: 18px;
			/*text-align: justify;*/
		}
		.content_ells{
			overflow: hidden; 
			text-overflow: ellipsis;
			display: -webkit-box; 
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
		}
		.bottom {
			display: inline;
			float: right;
			color: #34dbbf;
			font-size: 12px;
			height: 12px;
			line-height: 12px;
			padding-top: 5px;
		}
	}
	.line{
		margin-top: 5px;
	}
}
</style>



