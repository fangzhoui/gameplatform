<template>
<div class="test_one">
  <div class="camera">
      <div class="stage">
          <div class="cube up">up</div>
          <div class="cube down">down</div>
          <div class="cube left">left</div>
          <div class="cube right">right</div>
          <div class="cube front">front</div>
          <div class="cube back">back</div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'test-one',
  data(){
    return {

    }
  },
  created(){
  },
  mounted(){

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.test_one{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .camera{
    width: 402px;
    height: 402px;
    margin: 100px auto;
    perspective: 2000px;
    perspectiv-origin: center center;
    .stage{
      width: 100%;
      height: 100%;
      border: 1px dashed #000;
      transform: rotateY(0deg) rotateX(0deg);
      transform-style: preserve-3d;
      animation: rot 1s infinite;
      .cube{
        position: absolute;
        left: 75px;
        top: 100px;
        margin-left: 30px;
        font-size: 26px;
        width: 200px;
        height: 200px;
        color: white;
        background-color: rgba(255, 85, 85, 1);
        line-height: 200px;
        text-align: center;
      }
      .up{
        background-color: pink;
        transform: rotateX(90deg) translateZ(100px);
      }
      .down{
        background-color: grey;
        transform: rotateX(-90deg) translateZ(100px);
      }
      .left{
        background-color: blue;
        transform: rotateY(-90deg) translateZ(100px);
      }
      .right{
        background-color: green;
        transform: rotateY(90deg) translateZ(100px);
      }
      .front{
        background-color: yellow;
        transform: translateZ(100px);
      }
      .back{
        background-color: red;
        transform: rotateY(180deg) translateZ(100px);
      }
      @keyframes rot{
        0%{
          transform: rotateY(0deg) rotateX(0deg);
        }
        20%{
          transform: rotateY(36deg) rotateX(36deg);
        }
        40%{
          transform: rotateY(72deg) rotateX(72deg);
        }
        60%{
          transform: rotateY(108deg) rotateX(108deg);
        }
        80%{
          transform: rotateY(144deg) rotateX(144deg);
        }
        100%{
          transform: rotateY(180deg) rotateX(180deg);
        }
        120%{
          transform: rotateY(216deg) rotateX(216deg);
        }
        140%{
          transform: rotateY(252deg) rotateX(252deg);
        }
        160%{
          transform: rotateY(288deg) rotateX(288deg);
        }
        180%{
          transform: rotateY(326deg) rotateX(326deg);
        }
        200%{
          transform: rotateY(360deg) rotateX(360deg);
        }
      }
    }
  }
}
</style>
