<template>
<div class="backBox">
  <div class="fan" @click="backTo"><img src="../../assets/fan@2x.png">返回</div>
  <div class="backTie">{{title}}</div>
  <div class="right" @click.stop="saveFn">{{right}}</div>
</div>
</template>

<script>
export default {
  name: 'back-to',
  props: {
  	title: {
  		type: String,
  		default: ''
  	},
    right: String,
    default: ''
  },
  methods: {
    backTo(){
      window.history.go(-1);
    },
    saveFn(){
      this.$emit('saveFn')
    }
  }
}
</script>

<style lang="less" scoped>
@r: 37.5rem;
.backBox {
  display: flex;
  justify-content: space-between;
  background-color: #34dbbf;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #ffffff;
  z-index: 999;
  white-space: nowrap;
  .fan {
    margin-left: 14px;
    img {
      position: relative;
      top: 2px;
      margin-right: 11px;
      width: 8px;
      height: 14px;
    }
  }
  .backTie {
    position: absolute;
    top: 0;
    width: 200/@r;
    left: 50%;
    transform: translate(-50%);
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
  }
  .right{
    margin-right: 14px;
  }
}
@media screen and (min-width: 500px) {
  .backBox{
    max-width: 680px;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
