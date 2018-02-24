<template>
<div class="rating_box" ref="ratingBox">
	<div class="backBox">
      <div class="fan" @click="backTo"><img src="../../../assets/fan@2x.png">返回</div>
    </div>
	<div v-if="show">
		<rating-item :showBottom="false" :rating="getratingtext"></rating-item>
	</div>
	<div class="rating_content">
		<textarea @keyup="textLenFn" :placeholder="defaultText" type="text" maxLength="200" class="rating_at" ref="ratingAt" v-model="ratingContent"></textarea>
		<span class="text_len">{{textLen}}/200</span>
		<mt-button @click.native="handleClick(1)" class="btclass">发表</mt-button>
		<mt-button @click.native="handleClick(0)" class="btclass cancelBtn">取消</mt-button>
	</div>
</div>
</template>

<script>
import ratingItem from 'components/common/ratingitem'
import {mapActions, mapGetters} from "vuex"
import feedapi from 'api/feedlist'
import { Toast } from 'mint-ui'
export default{
	name: 'game-content',
	data(){
		return{
			ratingContent: '',
			defaultText: '回复',
			show: true,
			textLen: 0,
			showTextFn: true
		}
	},
	props: ['page'],
	computed: {
		...mapGetters([
  			'getratingtext', 'getRatingType'
  		])
	},
	created(){
		// 解决滚动穿透问题
		let obj = document.body || document.documentElement;
		obj.style.height = '100%';
		obj.style.overflow = 'hidden';
		if(JSON.stringify(this.getratingtext) == "{}"){
			this.show = false;
		}
	},
	methods: {
		...mapActions([ 'ratingTextShow', 'titleShow', 'ratingList', 'ratingCount', 'pushList', 'set_feed', 'unshiftList']),
		handleClick(type){
			if(type){
				if(!!this.ratingContent){
					let info = {
						content: this.ratingContent,
						linkType: this.getRatingType
					}
					if(!!this.getratingtext.id){
						info.toCommentId = this.getratingtext.id
					}
					if(!!this.getratingtext.uid){
						info.toUid = this.getratingtext.uid
					}
					let gameId = this.$route.query.gameId || this.getStatus(this.$route.path);
					if(!!gameId){
						info.linkId = Number(gameId);
					}
					this.insertfn(info);
				}else{
					Toast({
					  message: '请添加评论',
					  position: 'bottom',
					  duration: 3000
					});
				}
			}else{
				this.titleShow(true);
				this.ratingTextShow(false);
				this.set_feed(false);
			}
		},
		getStatus (urlStr) {
		    var urlStrArr = urlStr.split('/')
		    return urlStrArr[urlStrArr.length - 1]
		},
		insertfn(obj){
	      feedapi.insert(obj).then((res) => {
	        if (res.data.code == '0') {
				this.getcommentList();
				this.$toast('评论成功');
	        }
	      })
	    },
	    textLenFn(){
	    	this.textLen = this.$refs.ratingAt.value.length;
	    	if(this.textLen >= 200 ){
	    		if(this.showTextFn){
		    		this.$toast({
						message: '最多可输入200字',
						position: 'top',
						duration: 3000
					});
					setTimeout(() => {
						this.showTextFn = true;
					}, 3000)
	    		}
	 			this.showTextFn = false;
	    	}
	    },
	    getcommentList(){
	    	let obj = {
		        linkType: this.getRatingType,
		        pageSize: 10
		    }
		    let gameId = this.$route.query.gameId || this.getStatus(this.$route.path);
			if(!!gameId){
				obj.linkId = Number(gameId);
			}
			feedapi.commentList(obj).then((res) => {
				if (res.data.code == '0') {
					this.unshiftList(res.data.data.voList[0]);
					this.$emit('ratingOK');
					this.ratingCount(res.data.data.count);
					this.titleShow(true);
					this.ratingTextShow(false);
					this.set_feed(false);
				} else {
					this.$toast(res.data.userMessage);
				}
			})
		},
		backTo(){
			this.titleShow(true);
			this.ratingTextShow(false);
			this.set_feed(false);
		}
	},
	destroyed(){
		let obj = document.body || document.documentElement;
		obj.style.height = '';
		obj.style.overflow = '';
	},
	components: {
		'rating-item': ratingItem
	}
}
</script>

<style lang="less" scoped>

.rating_box{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: scroll;
	background: #fff;
	padding: 44px 0 0 0;
	box-sizing: border-box;
	z-index: 99;
	.rating_content{
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
			margin-top: 10px;
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
@media screen and (min-width: 500px) {
    .rating_box{
      width: 680px;
      left: 50%;
      transform: translateX(-50%);
    }
}
.backBox {
  display: flex;
  justify-content: space-between;
  background-color: #34dbbf;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #ffffff;
  z-index: 100;
  .fan {
    margin-left: 14px;
    img {
      position: relative;
      top: 2px;
      margin-right: 11px;
      width: 8px;
      height: 14px;
    }
  }
  .backTie {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>


