<template>
<div class="letter_desc">
	<back-to :title="detail.name"></back-to>
	<div v-html="detail.webContent" ref="content"></div>
  <div class="aaaa"></div>
</div>
</template>

<script>
import feedapi from 'api/feedlist'
export default {
  name: 'letter-desc',
  data(){
    return {
    	detail: ''
    }
  },
  created(){
  	this.getContent();
  },
  methods: {
  	getContent(){
  		let id = this.$route.query.linkId;
  		let obj = {
  			id: id
  		}
      feedapi.letterDetail(obj).then(res => {
  			if(res.data.code == '0'){
  				this.detail = res.data.data;
  				this.$nextTick(() => {
            let obj = this.$refs.content;
            let img = obj.getElementsByTagName('img');
            for(let i = 0; i < img.length; i++){
              img[i].style.marginBottom = '10px';
              img[i].style.marginTop = '10px';
              this.getImgNaturalDimensions(img[i], function(TW){
                let TWidth = TW;
                let NWidth = !!img[i].width ? img[i].width : TWidth;
                let a = parseInt(NWidth/TWidth * 100);
                if(a > 100){
                  a = 100;
                }
                img[i].style.width = a + '%';
              });
            }
            let Oa = obj.getElementsByTagName('a');
            for (let i = 0; i < Oa.length; i++){
              let item = Oa[i];
              let url = item.href;
              let reg = /opengamedetail/;
              if(reg.test(url)){
                let aImg = item.getElementsByTagName('img');
                for (let j = 0; j < aImg.length; j++){
                  aImg[j].setAttribute('gameId', this.getStatus(item.href));
                }
                item.setAttribute('gameId', this.getStatus(item.href));
                item.href = 'javaScript:;';
                item.addEventListener('click', this.cli, false);
              }
            }
          })
  			}
  		})
  	},
    cli(e){
      let obj = e.target;
      let id = obj.getAttribute('gameId');
      this.$router.push({path: `/gameDel/${id}`})
    },
    getStatus (urlStr) {
      var urlStrArr = urlStr.split('=')
      return urlStrArr[urlStrArr.length - 1]
    },
    getImgNaturalDimensions(img, callback) {
      var nWidth, nHeight;
      var image = new Image();
      image.src = img.src;
      image.onload = function(){
        nWidth = img.naturalWidth
        nHeight = img.naturalHeight
        callback(nWidth)
      }
    }
  }
}
</script>

<style scoped>
/*@import '../../../css/quill.css'*/
.letter_desc{
	padding: 54px 20px;
}
.desc_title{
	text-align: center;
	font-size: 15px;
	color: #333;
	padding-bottom: 28px;
}
</style>
