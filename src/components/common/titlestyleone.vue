<template>
	<div class="bix">
		<div class="title_pane">
			<span class="icon" :style="{background: titleOne.color}"></span>
			<span class="text">{{titleOne.name}}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'title-style',
	props:  {
		titleOne: {
			type: Object,
			default() {
				return {
					color: '#000',
					name: '默认'
				}
			}
		}
	}
}
</script>

<style scoped>
.bix{
  width: 100%;
  padding: 10px 0px 10px 13px;
  box-sizing: border-box;
  height: 100%;
  font-size: 0;
}
.title_pane {
	height: 100%;
	line-height: 30px;
}
.title_pane .icon {
	display: inline-block;
	vertical-align: top;
 	width: 2px;
 	height: 100%;
 	margin-right: 5px;
}
.title_pane .text {
	display: inline-block;
	vertical-align: top;
	font-size: 14px;
	color: #333;
	font-family: '微软雅黑';
	font-weight: bold;
}
</style>
