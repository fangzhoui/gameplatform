<template>
<div class="game_rating_wrap">
	<ul class="game_rating_list" ref="ratingList" v-if="getRatingCount != 0 && !getratingTextShow">
		<li class="game_rating_item" v-for="(item,index) in getratingList" :key="index">
			<rating-item :rating="item" :index="index" @ratingIndex="ratingIndex"></rating-item>
			<div class="line"></div>
		</li>
		<li @click.stop="loadmore" class="loadmore">{{loadmoretext}}</li>
	</ul>
	<div class="rating_none" v-if="getRatingCount == 0">
		<img src="../../../assets/ratingnone.png">
		<p>暂时还没有人评论哦，快来抢沙发</p>
	</div>
	<rating-text v-if="getratingTextShow" :page="page" @ratingOK="ratingOK"></rating-text>
	<complaint v-if="getComplaint"></complaint>
	<div class="rating_icon" @click="gameRating">
		<img src="../../../assets/rating.png" width="100%" height="100%">
	</div>
</div>
</template>

<script>
import ratingItem from 'components/common/ratingitem'
import complaint from 'components/common/complaint'
import ratingText from 'components/pages/gamedel/ratingcontent'
import {mapActions, mapGetters} from "vuex"
import feedapi from 'api/feedlist'
import { Indicator } from 'mint-ui'
export default{
	name: 'game-rating',
	data(){
		return{
			page: 1,
			loadmoretext: '加载更多',
			rIndex: -1
		}
	},
	computed: {
		...mapGetters([
  			'getratingTextShow', 'getComplaint', 'getratingList', 'getRatingCount', 'getRatingType'
  		]),
	},
	created(){
		if(this.getRatingCount > this.getratingList.length){
			this.loadmoretext = '加载更多'
		}else{
			this.loadmoretext = '没有更多评论了'
		}
	},
	watch: {
		'getratingList'(f, n){
			if(this.getRatingCount > this.getratingList.length){
				this.loadmoretext = '加载更多'
			}else{
				this.loadmoretext = '没有更多评论了'
			}
		}
	},
	methods: {
		...mapActions(['ratingtext', 'titleShow', 'ratingTextShow', 'pushList', 'ratingList', 'set_feed', 'ratingCount']),
		gameRating(){
			let loggedIn = Number(localStorage.getItem('logged-in'));
			if(loggedIn){
				let obj = {};
				this.ratingtext(obj); // 设置评论内容为空
			    this.titleShow(false); // 隐藏游戏主页的tab
			    this.ratingTextShow(true); //显示评论窗口
			    this.set_feed(true); // 处理评论时点击游览器回退到主页
			}else{
				this.$router.push({path: '/login'});
			}
		},
		loadmore(){
			if(this.getratingList.length >= this.getRatingCount){
				return
			}else{
				this.page++;
		    	let obj = {
			        linkType: this.getRatingType,
			        pageSize: 10,
			        page: this.page
			    }
			    let gameId = this.$route.query.gameId || this.getStatus(this.$route.path);
				if(!!gameId){
					obj.linkId = Number(gameId);
				}
				Indicator.open();
				feedapi.commentList(obj).then((res) => {
					if (res.data.code == '0') {
						res.data.data.voList.forEach((item) => {
							this.pushList(item);
						})
						Indicator.close();
						this.ratingCount(res.data.data.count)
						this.titleShow(true);
						this.ratingTextShow(false);
					} else {
						this.$toast(res.data.userMessage);
					}
				})
			}
		},
		getStatus (urlStr) {
		    var urlStrArr = urlStr.split('/')
		    return urlStrArr[urlStrArr.length - 1]
		},
		ratingOK(){
			if(this.rIndex>=0){
				let index = this.rIndex + 1;
				let count = this.getratingList[index].revertTimes + 1;
				this.$set(this.getratingList[index], 'revertTimes', count);
				this.rIndex = -1;
			}
		},
		ratingIndex(a){
			this.rIndex = a;
		}
	},
	components: {
		'rating-item': ratingItem,
		'rating-text': ratingText,
		complaint
	},
	destroyed(){
		// this.ratingtext({});
		// this.ratingList([]);
	}
}
</script>

<style lang="less" scoped>
.game_rating_wrap{
	position: relative;
	/*min-height: 400px;*/
}
.rating_icon{
	position: fixed;
	bottom: 20px;
	right: 10px;
	width: 65px;
	height: 65px;
	overflow: hidden;
	img{
		width: 100%;
    	height: 100%;
	}
}
.rating_none{
	height: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
@media screen and ( min-width: 319px){
	.rating_none{
		height: 400px;
	}
	.game_rating_wrap{
		/*min-height: 400px;*/
	}
}
@media screen and ( min-width: 414px){
	.rating_none{
		height: 500px;
	}
	.game_rating_wrap{
		/*min-height: 500px;*/
	}
}
.rating_none img{
	padding-top: 75px;
	width: 145px;
	height: 89px;
}
.rating_none p{
	text-align: center;
	font-size: 14px;
	color: #999;
	padding-top: 35px;
}
.loadmore{
	height: 100px;
	width: 100%;
	line-height: 100px;
	text-align: center;
	font-size: 14px;
	color: #34dbbf;
}
</style>

