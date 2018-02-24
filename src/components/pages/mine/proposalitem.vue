<template>
<div class="proposal_item underline">
	<div class="avatar">
		<div class="img_wrap">
			<img :src="puburl + '/' + proplist.avatar" width="100%" height="100%" v-if="!!proplist.avatar">
			<img src="../../../assets/mine.png" width="100%" height="100%" v-else>
		</div>
	</div>
	<div class="content">
		<h3 class="title">{{proplist.userName}}</h3>
		<p class="text">{{proplist.content}}</p>
		<ul class="images" v-if="imagesList.length>0 && showImage">
			<li class="images_item" v-for="(item,index) in imagesList" @click.stop="showSwipe(index)">
				<img :src="puburl + '/' + item">
			</li>
		</ul>
		<p class="time">{{ proplist.createAt | formatDate}}</p>
		<div class="feedback" v-if="!!proplist.feedbackContent">
			<div class="icon">
				<img src="../../../assets/qianmei.png">
			</div>
			<div class="feedback_text"><span class="qianmei">千妹:</span>{{proplist.feedbackContent}}
			</div>
		</div>
	</div>
</div>
</template>

<script>
import {formatDate} from 'js/date'
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'proposal-item',
	data(){
		return{
			puburl: sessionStorage.getItem("puburl"),
			imagesList: [],
		}
	},
	props: {
		proplist:{
			type: Object,
			default(){
				return{}
			}
		},
		showImage: {
			type: Boolean,
			default: true
		}
	},
	created(){
		if(!!this.proplist.image && this.proplist.image != 'null' && this.proplist.image != 'undefined'){
			try{
				this.imagesList = JSON.parse(this.proplist.image)	
			}catch(err){
				this.imagesList = []
			}
			
		}
	},
	methods: {
		...mapActions([
	      'setindex', 'showswipe', 'setimages'
	    ]),
		showSwipe(index){
			this.setimages(this.imagesList);
			this.setindex(index);
			this.showswipe(true);
		}
	},
	filters: {
		formatDate (time) {
			let date = new Date(time)
			return formatDate(date, 'yyyy-MM-dd hh:mm')
		}
	},
}
</script>

<style lang="less" scoped>
.proposal_item{
	display: flex;
	padding: 15px;
	.avatar{
		flex: 0 0 53px;
		.img_wrap{
			width: 43px;
			height: 43px;
			overflow: hidden;
			border-radius: 50%;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.content{
		flex: 1;
		font-size: 0;
		.title{
			font-size: 14px;
			color: #34dbbf;
			padding-top: 4px;
			padding-bottom: 10px;
		}
		.text{
			font-size: 14px;
			color: #333;
			line-height: 21px;
			text-align: justify;
		}
		.images{
			display: flex;
			justify-content: flex-start;
			margin-top: 13px;
			.images_item{
				width: 30%;
				height: 0;
				padding-top: 30%;
				overflow: hidden;
				position: relative;
				margin-right: 7px;
				img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
		}
		.time{
			font-size: 10px;
			color: #999;
			padding: 11px 0 20px 0;
		}
		.feedback{
			position: relative;
			padding: 10px;
			background: #f4f4f7;
			border-radius: 4px;
			&:after{
				position: absolute;
				top: -20px;
				left: 25px;
				width: 0px;
				height: 0;
				content: '';
				background: #fff;
				border-top: 10px solid transparent;
			    border-right: 10px solid transparent;
			    border-bottom: 10px solid #f4f4f7;
			    border-left: 10px solid transparent;
			}
			.icon{
				position: absolute;
				top: 10px;
				left: 10px;
				width: 20px;
				height: 20px;
				overflow: hidden;
				margin-right: 4px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.feedback_text{
				font-size: 13px;
				color: #333;
				text-indent: 2em;
				line-height: 23px;
				word-wrap: break-word;
				word-break: break-all;
				.qianmei{
					font-size: 13px;
					color: #34dbbf;
					padding-right: 9px;
				}
			}
		}
	}
}
</style>
