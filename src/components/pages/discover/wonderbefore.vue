<template>
  <div class="box">
    <div class="text_name">
      <slot name="name">
        <p></p>
      </slot>
      <div class="content">
        <slot name="txt">
          <p></p>
        </slot>
        <slot name="time">
          <p></p>
        </slot>
      </div>
    </div>
    <slot>
      <img src="http://oo6gk8wuu.bkt.clouddn.com/sky1.jpg">
    </slot>
  </div>
</template>



<style scoped>
.box{
  width: 100%;
  padding: 10px 13px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box img {
  border-radius: 10px;
  width: 60px;
  height: 60px;
}
.text_name{
  font-size: 13px;
  color: #333;
  margin-top: 5px;
  font-family: '微软雅黑';
  font-weight: bold;
}
.text_name p{
  margin-bottom: 5px;
  /*width: 74px;*/
  line-height: 1.2;
  text-align: left;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.content{
  font-size: 11px;
  color: #999;
  margin-top: 5px;
  font-family: '微软雅黑';
  /*font-weight: bold;*/
}
.content p{
  margin-bottom: 5px;
  line-height: 1.5;
  text-align: left;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
