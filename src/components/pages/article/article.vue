<template>
<div class="article_wrap">
  <back-to :title="list.name"></back-to>
  <div class="content" v-html="list.content" ref="content"></div>
  <div class="line"></div>
  <game-rating></game-rating>
</div>
</template>

<script>
import api_discover from 'api/game'
import gameRating from 'components/pages/gamedel/gamerating'
import { mapGetters, mapActions } from 'vuex'
import feedapi from 'api/feedlist'
export default {
  name: 'article-wrap',
  data(){
    return {
      list: {},
    }
  },
  created(){
    this.init()
    this.ratingtext({});
    this.ratingList([]);
  },
  methods: {
    init(){
      this.ratingType(1)
      this.getArticle()
    },
    ...mapActions([
      'ratingList', 'ratingCount', 'ratingType', 'ratingtext'
    ]),
    getArticle(){
      let obj = {
        id: Number(this.$route.query.gameId)
      }
      api_discover.articleDetail(obj).then((res) => {
        if(res.data.code == '0'){
          this.list = res.data.data;
          let id = res.data.data.id;
          this.getRatingList(id);
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
            let h1 = obj.getElementsByTagName('h1');
            for(let i = 0; i < h1.length; i++){
               h1[i].style.textAlign = 'center';
               h1[i].style.paddingBottom = '10px';
            }
            let p = obj.getElementsByTagName('p');
            for(let i = 0; i < p.length; i++){
               p[i].style.fontSize = '12px';
               p[i].style.lineHeight = '1.5';
               if(p[i].getElementsByTagName('img').length == 0){
                 p[i].style.textIndent = '2em';
               }
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
    getRatingList(id){
      let obj = {
        linkId: id,
        linkType: 1,
        pageSize: 10,
      }
      feedapi.commentList(obj).then((res) => {
        if (res.data.code == '0') {
          this.ratingList(res.data.data.voList);
          this.ratingCount(res.data.data.count);
        } else {
          this.$toast(responce.data.userMessage);
        }
      })
    },
    backTo(){
      window.history.go(-1);
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
  },
  components: {
    'game-rating': gameRating,
  },
  destroyed(){
    this.ratingtext({});
    this.ratingList([]);
  }
}
</script>

<style lang="less" scoped>
.article_wrap{
  width: 100%;
  padding-top: 44px;
  box-sizing: border-box;
  position: relative;
  .content{
    width: 100%;
    overflow-x: hidden;
    padding: 7px 20px 20px 20px;
    box-sizing: border-box;
  }
}
@media screen and (min-width: 500px) {
  .article_wrap{
    max-width: 680px;
    margin: 0 auto;
  }
}
</style>
