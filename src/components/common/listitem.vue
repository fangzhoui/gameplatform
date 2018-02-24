<template>
	<div>
		<div class="list_item">
			<div class="text_pane_item">
				<div class="icon_main">
					<slot>
						<img src="../../assets/lljl@2x.png">
					</slot>
				</div>
				<p class="text_descript">{{title}}</p>
			</div>
			<img v-if="showArrow" class="icon_arrow" src="../../assets/arrow@2x.png">
		</div>
	</div>
</template>


<script>

export default {
	name:'list-item',
	props: {
		title: {
			type: String,
			default: '列表'
		},
		showArrow: {
			type: Boolean,
			default: true,
		}
	}
}
</script>



<style scoped>

.list_item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 41px;
	padding: 5px 14px;
	background: #fff;
}
.text_pane_item {
	display: flex;
  	align-items: center;
	font-family: '微软雅黑';
	font-weight: bold;
	color: #333;
	font-size: 13px;
}
.text_descript {
	margin: 0 11px;
}
.icon_main img {
  margin-top: 3px;
	width: 15px;
	height: 15px;
}
.icon_arrow {
	width: 6px;
	height: 9px;
}
</style>
