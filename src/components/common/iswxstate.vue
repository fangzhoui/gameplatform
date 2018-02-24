<template>
	<div class="iswx_wrap" v-if="iswx">
		<img src="../../assets/iswx.png">
	</div>
</template>

<script>
export default{
	name: 'iswx',
	props: {
		iswx: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped>
.iswx_wrap{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 99999;
	background: rgba(0,0,0,0.6)
}
.iswx_wrap img{
	width: 70%;
  	float: right;
  	margin: 20px;
}
</style>
