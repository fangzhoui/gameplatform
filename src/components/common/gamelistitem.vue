<template>
  <div class="box">
    <div class="single_item_pane">
      <div>
        <slot>
          <img src="http://oo6gk8wuu.bkt.clouddn.com/sky1.jpg">
        </slot>
        <div class="text_name">
          <slot name="name">
            <p></p>
          </slot>
        </div>
        <div class="text_pane">
          <slot name="txt">
            <p></p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.box{
  width: 25%;
  margin-bottom: 20px;
}

.single_item_pane {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.single_item_pane img {
  border-radius: 10px;
  padding-left: 7px;
  width: 60px;
  height: 60px;
}
.text_name{
  margin-top: 5px;
  font-family: '微软雅黑';
  font-weight: bold;
}
.text_name p{
  font-size: 11px;
  color: #333;
  margin-bottom: 5px;
  width: 74px;
  line-height: 1.2em;
  text-align: center;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.text_pane{
  margin-top: 5px;
  font-family: '微软雅黑';
  font-weight: bold;
}
.text_pane p{
  font-size: 9px;
  color: #808080;
  margin-bottom: 5px;
  width: 74px;
  line-height: 1.2em;
  text-align: center;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
