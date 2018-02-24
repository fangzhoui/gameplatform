<template>
	<div class="list_item_wrap">
		<div class="list_item_content">
			<img :src="puburl + '/' + image">
		</div>
		<div class="delete_icon" @click="deleteItemFn"></div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { $loadImage } from '../../js/loadImage'
import { MessageBox } from 'mint-ui';
export default {
	name: 'list-item',
	data(){
		return {
			puburl: sessionStorage.getItem("puburl"),
		}
	},
	props: {
		keys: {
			type: Number,
			default: 0
		},
		image: {
			type: String,
			default: ''
		}
	},
	methods: {
		...mapActions([
			'delete_img', 'set_add_show'
		]),
		deleteItemFn(){
			let _self = this;
			MessageBox.confirm('确定执行此操作?').then(action => {
			  	this.delete_img(this.keys);
			});
		},
		addImage(){
			// let url = this.puburl + '/' + this.image;
			// let obj = this.$refs.imgBox;
			// $loadImage(url, obj, function(){})
		}
	},
	destroyed(){
		// this.addImage()
	},
	mounted(){
		// this.addImage()
	}
}
</script>



<style lang="less" scoped>

.list_item_wrap{
	position: relative;
	margin-left: 13px;
}
.list_item_content {
	position: absolute;
	width: 70px;
	height: 70px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	img{
		width: 100%;
		height: 100%;
	}
}
.delete_icon{
	position: absolute;
	width: 17px;
	height: 17px;
	top: -5px;
	right: -5px;
	background-image: url('../../assets/delete_icon.png');
	background-size: 100%;
	background-repeat: no-repeat;
}
</style>