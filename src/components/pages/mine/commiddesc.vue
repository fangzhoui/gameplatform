<template>
<div class="commid_desc">
	<back-to title="回复"></back-to>
	<div class="commid_content">
		<div class="avatar">
			<div class="avatar_box">
				<img :src="puburl + '/' + feeddesc.avatar" v-if="!!feeddesc.avatar">
				<img src="../../../assets/mine.png" v-else>
			</div>
			<div class="commid_name">{{feeddesc.userName}}</div>
		</div>
		<p class="commid_text">{{feeddesc.content}}</p>
	</div>
	<div class="line"></div>
	<div class="commid_rating">
		<h3 class="all_ratings underline">全部回复 ( {{feeddesc.count}} )</h3>
		<div class="rating_part underline" v-for="item in list">
			<div class="avatar_box">
				<div class="avatar_wrap">
					<img :src="puburl + '/' + item.commentAvatar" v-if="!!item.commentAvatar">
					<img src="../../../assets/mine.png" v-else>
				</div>
			</div>
			<div class="rating_box">
				<p class="name">{{item.commentName}}<span class="color_type">回复</span>{{feeddesc.userName}}</p>
				<p class="desc">{{item.commentContent}}</p>
				<p class="time">{{item.commentDate | giffTime}}</p>
			</div>
			<div class="rating_btn" @click.stop="ratingReply(item)">回复</div>
		</div>
	</div>
</div>
</template>

<script>
import backTo from 'components/common/backTo'
import feedapi from 'api/feedlist'
import {formatDate, getDateDiff} from 'js/date'
export default{
	name: 'commid-desc',
	data(){
		return{
			feeddesc: {},
			list: {},
			puburl: sessionStorage.getItem("puburl"),
		}
	},
	components: {
		'back-to': backTo
	},
	created(){
		let id = this.$route.query.commid;
		this.beCommentDetail({commentId: id});
	},
	methods: {
		beCommentDetail(obj){
		    feedapi.beCommentDetail(obj).then(res => {
		        if(res.data.code == '0'){
		          	this.feeddesc = res.data.data;
		          	this.list = res.data.data.list;
		        }
		    })
	    },
	    ratingReply(item){
	    	let ratingText = {
	    		avatar: item.commentAvatar,
	    		userName: item.commentName,
	    		content: item.commentContent,
	    		linkType: item.linkType,
	    		commentId: item.commentId,
	    		toUid: item.toUid,
	    		linkId: item.linkId
	    	}
      		this.$router.push({name: 'commid-rating', params: {rating: ratingText}})
	    }
	},
	filters: {
		giffTime(time){
			return getDateDiff(time);
		}
	}
}
</script>

<style lang="less" scoped>
.commid_desc{
	width: 100%;
	height: 100%;
	padding-top: 44px;
	background-color: #fff;
	position: relative;
	box-sizing: border-box;
	.commid_content{
		margin-top: 12px;
		width: 100%;
		padding: 13px;
		box-sizing: border-box;
		.avatar{
			padding-bottom: 8px;
			.avatar_box{
				width: 32px;
				height: 32px;
				border-radius: 50%;
				overflow: hidden;
				display: inline-block;
				vertical-align: top;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.commid_name{
				display: inline-block;
				vertical-align: top;
				height: 32px;
				line-height: 32px;
				color: #34dbbf;
				padding-left: 10px;
				font-size: 14px;
			}
		}
		.commid_text{
			width: 100%;
			font-size: 12px;
			line-height: 1.5;
			color: rgb(128, 128, 128);
			padding-bottom: 10px;
		}
	}
	.commid_rating{
		background-color: #fff;
		.all_ratings{
			height: 37px;
			line-height: 37px;
			font-size: 14px;
			color: rgb(42, 42, 42);
			font-weight: normal;
			padding-left: 13px;
		}
		.rating_part{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			.avatar_box{
				flex: 0 0 42px;
				padding: 13px;
				box-sizing: border-box;
				.avatar_wrap{
					width: 30px;
					height: 30px;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			.rating_box{
				padding: 18px 0 8px 0;
				flex: 1;
				.name{
					font-size: 12px;
					color: rgb(42, 42, 42);
					line-height: 12px;
					margin-bottom: 8px;
					.color_type{
						color: rgb(134, 134, 134);
						padding: 0 6px;
					}
				}
				.desc{
					font-size: 12px;
					color: rgb(42, 42, 42);
					line-height: 1.5;
					margin-bottom: 6px;
				}
				.time{
					color: rgb(214, 214, 214);
					font-size: 10px;
					line-height: 1;
				}
			}
			.rating_btn{
				flex: 0 0 44px;
				width: 44px;
				height: 18px;
				border-radius: 10px;
				border: 1px solid rgb(199, 199, 199);
				font-size: 12px;
				line-height: 18px;
				text-align: center;
				color: rgb(199, 199, 199);
				margin-top: 16px;
				margin-right: 13px;
			}
		}
	}
}
</style>


