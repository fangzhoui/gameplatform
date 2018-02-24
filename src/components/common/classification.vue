<template>
	<div class="bix">
		<div class="circle_pane">
			<slot>
				<img src="../../assets/yx@2x.png">
			</slot>
			<slot name="txt">
				<p>默认</p>
			</slot>
		</div>
	</div>
</template>



<style scoped>
.bix{
  width: 25%;
}
.circle_pane {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}
.circle_pane img {
  	border-radius: 50%;
	width: 50px;
	height: 50px;
}
.circle_pane p {
	font-size: 12px;
	color: #666;
	font-family: '微软雅黑';
	font-weight: bold;
	margin-top: 10px;
}
</style>
