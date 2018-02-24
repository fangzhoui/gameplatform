<template>
	<div class="maintain_wrap" v-html="message" ref="content"></div>
</template>

<script>
import user from 'api/user'
export default{
	name: 'maintain-page',
	data(){
		return {
			message: ''
		}
	},
	created(){
		let obj = {section: 'vindicate'}
		user.webBySection(obj).then(res => {
			if(res.data.code == '0'){
				this.message = res.data.data.content;
				this.$nextTick(() => {
					let obj = this.$refs.content;
					let img = obj.getElementsByTagName('img');
					for(let i = 0; i < img.length; i++){
						img[i].style.width = '100%';
						img[i].style.marginBottom = '10px';
						img[i].style.marginTop = '10px';
					}
				})
			}
		})
	}
};
</script>

<style lang="less" scoped>

</style>
