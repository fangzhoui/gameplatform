<template>
  <div class="box">
    <div class="single_item_pane">
      <div>
        <slot name="icon_box">
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



<style lang="less" scoped>
@r:37.5rem;
.box{
  width: 25%;
  margin-bottom: 20/@r;
}

.single_item_pane {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.single_item_pane img {
  border-radius: 10px;
  /*margin-left: 7px;*/
  width: 100%;
  height: 100%;
}
.text_name{
  font-size: 11px;
  color: #333;
  margin-top: 14/@r;
  font-family: '微软雅黑';
  font-weight: bold;
}
.text_name p{
  margin-bottom: 5/@r;
  line-height: 1.2;
  text-align: center;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.text_pane{
  font-size: 9px;
  color: #808080;
  margin-top: 5/@r;
  font-family: '微软雅黑';
}
.text_pane p{
  margin-bottom: 5/@r;
  line-height: 1.5;
  text-align: center;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
