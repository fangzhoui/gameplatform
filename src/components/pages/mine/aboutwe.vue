<template>
<div class="aboutwe_wrap">
  <back-to title="关于我们"></back-to>
  <p v-html="wemsg" style="font-size: 16px"></p>
</div>
</template>

<script>
import gameMsg from "api/game"
export default {
  name: 'aboutwe',
  data(){
    return {
      wemsg: ''
    }
  },
  created(){
    let _self = this;
    let a = {
      section: 'aboutwe'
    }
    gameMsg.aboutwe(a).then((res) => {
      _self.wemsg = res.data.data.content;
    })
  },
}
</script>

<style lang="less" scoped>
.aboutwe_wrap{
  padding: 55px 15px;
}
@media screen and (min-width: 500px) {
  .aboutwe_wrap{
    max-width: 680px;
    margin: 0 auto;
  }
}
</style>
