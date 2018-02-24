<template>
	<div class="list_item_wrap underline">
		<div class="list_item_content">
			<slot>
				<img src="http://oo6gk8wuu.bkt.clouddn.com/header1.jpg">
			</slot>
			<div class="text_pane" :class="{pick_color: state}">
				<p>{{name}}</p>
				<p class="text_type">{{listType}}</p>
			</div>
		</div>
		<div class="delete_icon" v-if="showIcon">
			<slot name="deleteIcon">
				<i class="el-icon-circle-close" @click="deleteItemFn"></i>
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'product-item',
	data(){
		return {
			showIcon: false,
			state: false,
			indexlabel: ''
		}
	},
	props: {
		index: null,
		code: null,
		name: {
			type: String,
			default: '默认'
		},
		listType: {
			type: String,
			default: '默认'
		}
	},
	watch: {
		code: function(n, o){
			if(n==this.index){
				this.state = true
			}else{
				this.state = false
			}
		}
	},
	methods: {
		deleteItemFn(){
			this.$emit('deleteItem')
		},
		pickFn(){
			this.$emit('select', this.index)
		}
	}
}
</script>



<style scoped>
	
.list_item_wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
}
.list_item_wrap:hover {
	background: #eef1f6;
}
.list_item_content {
	display: flex;
	align-items: center;
}
.list_item_content img {
	width: 40px;
	height: 40px;
	border-radius: 20px;
}
.text_pane {
	margin-left: 10px;
	color: #333;
	min-width: 100px;
}
.text_type {
	font-size: 12px;
}
/*选中样式*/
.pick_color {
	color: #2196f3;
	/*background: #eef1f6;*/
}
</style>