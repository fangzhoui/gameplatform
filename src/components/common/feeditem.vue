<template>
	<div class="feeditem_wrap">
		<div class="time">{{feedList.createAt | formatDate}}</div>
		<div class="content_wrap">
			<div class="content">
				<slot name="title">
					<p>22</p>
				</slot>
			</div>
			<div class="icon" v-show="!!feedList.feedbackContent && !feedList.updateAt"></div>
		</div>
	</div>
</template>

<script>
import {formatDate} from 'js/date'
export default {
	name: 'feed-item',
	data(){
		return{

		}
	},
	props: {
		feedList: {
			type: Object,
			default(){
				return []
			}
		}
	},
	mounted(){
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
.feeditem_wrap{
	position: relative;
	width: 100%;
	background: #f6f5fa;
	padding: 0 13px;
	box-sizing: border-box;
	.time{
		height: 43px;
		line-height: 43px;
		width: 100%;
		text-align: center;
		font-size: 10px;
		color: #999;
	}
	.content_wrap{
		position: relative;
		width: 100%;
		/*height: 100px;*/
		background: #fff;
		border-radius: 5px;
		padding: 23px 23px 23px 27px;
		box-sizing: border-box;
		.content{
			p{
				font-size: 12px;
				line-height: 23px;
			}
		}
		.icon{
			position: absolute;
			top: 10px;
			right: 10px;
			width: 7px;
			height: 7px;
			border-radius: 50%;
			background-color: #ff0000;
		}
	}
}
</style>