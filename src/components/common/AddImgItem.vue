<template>
	<div class="upload_img_wrap">
		<div class="upload_img_pane">
			<i class="el-icon-plus" v-if="showIcon"></i>
			<i class="el-icon-loading" v-else></i>
			<input type="file" ref="imgUpload" class="upload_file" @change="uploadFn()">
		</div>
	</div>
</template>



<script>
import { mapActions } from 'vuex'
import md from 'js/md5'
import { base64encode } from 'js/base64encode'
import { dealImage, dataURLtoBlob } from 'js/dealimage'
import user from "api/user"
import { Toast } from 'mint-ui'
export default {
	name: 'upload-img-pane',
	data(){
		return {
			showIcon: true,
			uptoken: '',
		}
	},
	methods: {
		...mapActions([
			'set_banner_img'
		]),
		async uploadFn(){
			let _self = this;
			let uptoken;
			await user.getQiniuToken().then((res) => {
				if(res.data.code == '0'){
					uptoken = res.data.data;
				}
			})
			if(this.$refs.imgUpload.files.length>0){
				let file = this.$refs.imgUpload.files[0];
				let pre = file.name.split('.');
				let name = pre[0];
				let a = 'web' + new Date().getTime();
				let key = md.hex_md5(a);
				let blobFile;
				key = base64encode(key) + '.jpg';
				var reader = new FileReader();  
				reader.readAsDataURL(file);
				reader.onload = function(theFile) {  
					let path = theFile.target.result;
					let obj = _self.$refs.imgUpload;
					obj.value = ''; // 防止二次上传同样图片不执行
					dealImage(path, {width: 300}, function(base){
						blobFile = dataURLtoBlob(base);
						_self.upload(key, uptoken, blobFile)
					})
				}
			}
		},
		upload(key, uptoken, file){
			let _self = this;
			let oMyForm = new FormData();
			oMyForm.append("key", key);
			oMyForm.append("token", uptoken);
			oMyForm.append("file", file);
			let xmlHttp;
			// let url = "http://upload.qiniu.com/";
			let url = "https://up.qbox.me/";
			xmlHttp = new XMLHttpRequest(); 
			xmlHttp.open("POST", url, true);
			_self.showIcon = false;
			_self.showImage = false;
			xmlHttp.onload = function(oEvent) {
				if (xmlHttp.status == 200) {
					var res = JSON.parse(xmlHttp.responseText);
					let url = res.key;
					_self.set_banner_img(url);
					_self.showIcon = true;
				} else {
					Toast({
					  message: '上传出错',
					  position: 'bottom',
					  duration: 5000
					});
					_self.showIcon = true;
				}
			};
			xmlHttp.send(oMyForm);
		}
	}
}
</script>



<style scoped>
.upload_img_wrap{
	position: relative;
}
.upload_img_pane {
	width: 70px;
	height: 70px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 13px;
	position: absolute;
}
.upload_file {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.el-icon-plus{
	display: inline-block;
	width: 100%;
	height: 100%;
	background: url('../../assets/uploadimg.png');
	background-size: 100%;
}
.el-icon-loading{
	display: inline-block;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.2); 
	background-image: url('../../assets/loading.gif');
	background-size: 50% 50%;
	border-radius: 5px;
	background-repeat: no-repeat;
	background-position: 50% 50%;
}
</style>
