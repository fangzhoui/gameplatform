<template>
	<div class="maintain_wrap">
		<div class="logo">
			<img src="../../../assets/logo@3x.png">
		</div>
		<div class="content_wrap">
			<p class="content_text">
				尊敬的用户，尊敬的用户，尊敬的用户，尊敬的用户，尊敬的用户，尊敬的用户，尊敬的用户，尊敬的用户，尊敬的用户，
			</p>
			<div class="content_lx">
				<div class="icon">
					<img src="../../../assets/qs_web.png">
				</div>
				<div class="text">
					<span>千手官方网站</span><span class="color">www.qianshou.comwww.qianshou.com</span>
				</div>	
			</div>
			<div class="content_lx">
				<div class="icon">
					<img src="../../../assets/qs_phone.png">
				</div>
				<div class="text">
					<span>客服电话</span><a href="tel:1234654654545" class="color">1234654654545</a>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
export default{
  name: 'maintain-page',
  data(){
    return {}
  },
};
</script>

<style lang="less" scoped>
@r: 37.5rem;
.maintain_wrap{
	width: 100%;
	height: 100%;
	background: url('../../../assets/maintain_bg.png') no-repeat;
	background-size: 100% 100%;
	padding: 15/@r;
	box-sizing: border-box;
	.logo{
		width: 140/@r;
		height: 140/@r;
		overflow: hidden;
		margin: 0 auto;
		padding-top: 80/@r;
		padding-bottom: 20/@r;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.content_wrap{
		width: 345/@r;
		height: 400/@r;
		background-color: #fff;
		border-radius: 10/@r;
		font-size: 0;
		padding: 18/@r 0 17/@r;
		box-sizing: border-box;
		.content_text{
			padding: 0 32/@r;
			font-size: 14px;
			color: #8a8a8a;
			word-wrap: break-word;
			text-indent: 2em;
			line-height: 20px;
			text-align: justify;
		}
		.content_lx{
			height: 40/@r;
			padding: 28/@r 18/@r 0;
			display: flex;
			.icon{
				flex: 0 0 40/@r;
				height: 40/@r;
				width: 40/@r;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				flex: 1;
				height: 40/@r;
				line-height: 40/@r;
				padding-left: 19/@r;
				word-wrap: break-word;
				span{
					font-size: 14px;
					color: #8a8a8a;
					word-wrap: break-word;
				}
				.color{
					color: #34dbbf;
					padding-left: 13/@r;
					word-wrap: break-word;
				}
			}
		}
	}
}
</style>
