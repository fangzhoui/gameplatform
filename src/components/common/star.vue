<template>
	<div class="star">
		<span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
	</div>
</template>

<script>
	const LENGTH = 5
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'
	export default {
		name: 'star',
		props: {
			score: {
				type: Number,
				default: 5
			}
		},
		computed: {
			itemClasses() {
				let result = []
				let score = Math.floor(this.score * 2) / 2
				let hasDecimal = score % 1 !== 0
				let integer = Math.floor(score)
				for (let i = 0 ; i < integer; i++) {
					result.push(CLS_ON)
				}
				if (hasDecimal) {
					result.push(CLS_HALF)
				}
				while (result.length < LENGTH) {
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
</script>

 <style scoped>
.star{
	font-size: 0;
}
.star-item{
	display: inline-block;
	background-repeat: no-repeat;	
	width: 10px;
	height: 10px;
	margin-right: 3px;
	background-size: 10px 10px;
}
.on{
	background-image: url('../../assets/star.png');
}			
.half{
	
}
.off{
	background-image: url('../../assets/starnone.png');
}
			
		
</style>
