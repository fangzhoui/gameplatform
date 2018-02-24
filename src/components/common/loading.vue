<template>
	<div class="loading">
		<img src="../../assets/tab-loading.gif">
	</div>
</template>

<script>
export default {
	name: 'loading',
	data(){
		return {

		}
	},
}
</script>

<style lang="less" scoped>
.loading{
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 99;
	img{
		width: 100%;
		height: 100%;
	}
}
</style>
