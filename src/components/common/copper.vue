<template>
  <div class="avatar-cropper" v-if="copperShow">
    <div class="avatar-cropper-mark"><a href="javascript:;" class="avatar-cropper-close" @click="destroy">&times;</a></div>
    <div class="avatar-cropper-container">
      <div class="avatar-cropper-image-container">
        <img :src="dataUrl" alt="" @load.stop="createCropper" />
      </div>
      <div class="avatar-cropper-footer">
        <button class="avatar-cropper-btn" @click="destroy" v-text="labels.cancel"></button>
        <button class="avatar-cropper-btn" @click="submit" v-text="labels.submit"></button>
      </div>
    </div>
  </div>
</template>

<script>
  import 'cropperjs/dist/cropper.css'
  import Cropper from 'cropperjs'
  export default {
    props: {
      mimes: {
        type: String,
        default: 'image/png, image/gif, image/jpeg, image/jpg, image/bmp, image/x-icon, image/exif'
      },
      labels: {
        submit: "提交",
        cancel: "取消"
      },
      dataUrl: {
        type: String,
        default: undefined
      },
      copperShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        cropper: undefined,
      }
    },
    methods: {
      destroy() {
        this.cropper.destroy()
        this.$emit('hideCopper')
      },
      submit() {
        let b = this.uploadImage();
        this.$emit('base64Url', b)
        this.destroy()
      },
      createCropper() {
        let image = document.querySelector('.avatar-cropper-image-container img')
        this.cropper = new Cropper(image, {
          aspectRatio: 1,
          autoCropArea: 0.8,
          viewMode: 1,
          movable: false,
          zoomable: false,
        })
      },
      uploadImage() {
        var a = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
        return a;
      }
    },
  }
</script>

<style scoped>
  .avatar-cropper {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 99999;
  }
  .avatar-cropper-close {
    float: right;
    padding: 20px;
    font-size: 3rem;
    color: #fff;
    font-weight: 100;
    text-shadow: 0px 1px rgba(40, 40, 40,.3);
  }
  .avatar-cropper-mark {
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0, 0, 0, .10);
  }
  .avatar-cropper-container {
    background: #fff;
    z-index: 999;
    box-shadow: 1px 1px 5px rgba(100, 100, 100, .14);
  }
  .avatar-cropper-image-container {
    /*position: relative;*/
    /*max-width: 400px;
    height: 300px;*/
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:50px;
  }
  img {
    max-width: 100%;
    height: 100%;
  }
  .avatar-cropper-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom:0px;
    height: 50px;
    display: flex;
    align-items: stretch;
    align-content: stretch;
    justify-content: space-between;
  }
  .avatar-cropper-btn {
    width: 50%;
    padding: 15px 0;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
  }
  .avatar-cropper-btn:hover {
    background-color: #2aabd2;
    color: #fff;
  }
</style>