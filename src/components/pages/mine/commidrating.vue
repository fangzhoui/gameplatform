<template>
<div class="commid_rating">
	<back-to title="回复"></back-to>
	<div class="rating_item">
		<div class="rating_top">
		  	<div class="avatar_wrap">
				<img :src="puburl + '/' + ratingText.avatar" width="100%" height="100%" v-if="!!ratingText.avatar">
				<img src="../../../assets/mine.png" width="100%" height="100%" v-else>
		 	</div>
			<div class="avatar_name"><span class="name">{{ratingText.userName}}</span><span class="name_text">回复了我</span></div>
		</div>
		<div class="rating_content">{{ratingText.content}}</div>
	</div>
	<div class="ratingbox">
		<textarea @keyup="textLenFn" :placeholder="defaultText" type="text" maxLength="200" class="rating_at" ref="ratingAt" v-model="ratingContent"></textarea>
		<span class="text_len">{{textLen}}/200</span>
		<mt-button @click.native="handleClick(1)" class="btclass">发表</mt-button>
		<mt-button @click.native="handleClick(0)" class="btclass cancelBtn">取消</mt-button>
	</div>
</div>
</template>

<script>
import feedapi from 'api/feedlist'
import backTo from  'components/common/backTo'
export default{
	name: 'commid-rating',
	data(){
		return{
			puburl: sessionStorage.getItem("puburl"),
			ratingText: {},
			textLen: 0,
			defaultText: '回复',
			ratingContent: '',
			showTextFn: true,
		}
	},
	created(){
		this.ratingText = this.$route.params.rating;
	},
	methods: {
		handleClick(type){
			if(type){
				if(!!this.ratingContent){
					let info = {
						content: this.ratingContent,
						linkType: this.ratingText.linkType,
						toCommentId: this.ratingText.commentId,
						toUid: this.ratingText.toUid,
						linkId: this.ratingText.linkId
					}
					this.insertfn(info);
				}else{
					if(this.showTextFn){
						this.showTextFn = false;
						this.$toast({
						  	message: '请添加评论',
						  	position: 'bottom',
						  	duration: 3000
						});
						setTimeout(() => {
							this.showTextFn = true;
						}, 3000)
					}
					
				}
			}else{
				window.history.back()
			}
		},
		insertfn(obj){
		  feedapi.insert(obj).then((res) => {
			if (res.data.code == '0') {
				this.$toast({
				  message: '回复成功',
				  position: 'bottom',
				  duration: 3000
				});
				window.history.back();
			} else {
				this.$toast(res.data.userMessage);
			}
		  })
		},
		textLenFn(){
			this.textLen = this.$refs.ratingAt.value.length;
			if(this.textLen >= 200 ){
				if(this.showTextFn){
					this.showTextFn = false;
					this.$toast({
						message: '最多可输入200字',
						duration: 3000
					});
					setTimeout(() => {
						this.showTextFn = true;
					}, 3000)
				}
			}
		},
	},
	components: {
	  'back-to': backTo
	}
}
</script>

<style lang="less" scoped>
.commid_rating{
	padding-top: 44px;
	.rating_item{
	  padding: 13px;
	  .rating_top{
	    margin-bottom: 10px;
	    .avatar_wrap{
	      display: inline-block;
	      vertical-align: middle;
	      width: 30px;
	      height: 30px;
	      border-radius: 50%;
	      font-size: 0;
	      overflow: hidden;
	    }
	    .avatar_name{
	      display: inline-block;
	      vertical-align: middle;
	      font-size: 0;
	      padding-left: 2px;
	      color: #34dbbf;
	      font-weight: bold;
	      height: 28px;
	      line-height: 28px;
	      .name_text{
	        display: inline-block;
	        color: #666;
	        padding: 0 5px 0 5px;
	        font-size: 13px;
	        font-weight: 200;
	      }
	      .name{
	        display: inline-block;
	        font-size: 15px;
	      }
	    }
	    .avatar_time{
	      position: absolute;
	      top: -2px;
	      right: 10px;
	      span{
	        font-size: 10px;
	        line-height: 28px;
	        color: #999;
	        padding-left: 5px;
	      }
	    }
	  }
	  .rating_content{
	    font-size: 13px;
	    color: #333;
	    line-height: 1.5;
	    word-wrap: break-word;
	  }
	}
	.ratingbox{
		width: 100%;
		padding: 0 10px;
		box-sizing: border-box;
		.rating_at{
			width: 100%;
			height: 150px;
			border: none;
			outline: none;
			resize: none;
			box-sizing: border-box;
			font-size: 14px;
			line-height: 1.5;
			padding: 10px;
			background: #f5f5f5;
		}
		.btclass{
			float: right;
			width: 60px;
			height: 32px;
			background: #34dbbf;
			color: #fff;
			font-size: 14px;
			margin-top: 10px;
		}
		.cancelBtn{
			margin-right: 10px;
			background-color: #eee;
			color: #333;
			margin-top: 10px;
		}
		.text_len{
			display: inline-block;
			font-size: 12px;
			color: #333;
			height: 12px;
			line-height: 1;
		}
	}
}
</style>


