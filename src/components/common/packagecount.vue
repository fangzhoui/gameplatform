<template>
  <div class="game_item_wrap">
    <div class="side_left">
      <slot name="image">
          <!-- <img src="http://oo6gk8wuu.bkt.clouddn.com/sky1.jpg"> -->
      </slot>
      <div class="text_pane">
        <p class="title">
          <slot name="title">变形金刚</slot>
        </p>
        <p class="subName">
          <slot name="subName">百炼为战 全新上线</slot>
        </p>
        <p class="subName">
          <slot name="subDel"></slot>
        </p>
      </div>
    </div>
    <div class="download">
      <slot name="download">
        <p>下载</p>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'package-count',
  }
</script>

<style scoped>

  .game_item_wrap {
    display: flex;
    font-family: '微软雅黑';
    align-items: center;
    padding: 13px 15px;
    justify-content: space-between;
  }

  .side_left {
    width: 83%;
    display: flex;
    align-items: center;
  }
  .side_left img{
    border-radius: 10px;
    width: 60px;
    height: 60px;
  }
  .text_pane {
    flex-grow: 1;
    margin-left: 19px;
  }

  .title {
    width: 100%;
  }

  .title p {
    padding-top: 3px;
    font-size: 13px;
    color: #333;
    /*font-weight: 400;*/
    margin-top: 3px;
    width: 100%;
    height: 13.5px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1; /** 显示的行数 **/
    overflow: hidden; /** 隐藏超出的内容 **/
  }

  .subName p {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
    width: 100%;
    line-height: 1.3em;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden; /** 隐藏超出的内容 **/
  }

  .download {
    font-size: 12px;
    color: #34dbbf;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
