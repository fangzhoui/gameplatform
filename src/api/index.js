import axios from 'axios'
import md from 'js/md5'
import router from 'router'
import token from './token'

const baseURL = `${location.origin}/gameserver/`;
// const baseURL = `https://5iqianshou.com/gameserver/`;
// const baseURL = `http://139.224.207.42/gameserver/`;

const instance = axios.create({
  baseURL,
})
// 添加sign_key
const sign_key = 'ZVdvn7JgYmcwF21AYpXUffnW7CgYIsAm';
var flush = true;
instance.interceptors.request.use(function (config) {
    if(!config.url.match(/sign=/)) {
      config.url = config.url + (config.url.match(/\?/) ? '&' : '?') + 'sign=' + md.hex_md5(sign_key) ;
    }
    return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use((res) => {
  if(res.data.code == '16'){
    if(flush){
      flush = false;
      localStorage.removeItem('logged-in');
      setTimeout(() => {
        token.createToken();
        flush = true;
      }, 2000)
    }
  }
  if(res.data.code == '15'){
    window.alert('我遇到了未知错误，请刷新下页面看看');
  }
  if(res.data.code == '-1'){
    window.alert('我遇到了未知错误，请刷新下页面看看');
  }
  return res;
}, function (error) {
  if (error.response) {
      switch (error.response.status) {
        case 400:
          window.alert('我遇到了未知错误，要怎么办？稍后再试一下呗');
          break;
        case 404:
          window.alert('我遇到了未知错误，要怎么办？稍后再试一下呗');
          break;
        case 500:
          window.alert('当前网络出现故障');
          break;
        case 502:
          window.alert('我遇到了未知错误，要怎么办？稍后再试一下呗');
          break;
        case 504:
          window.alert('请求服务器超时');
          break;
      }
    }
  return Promise.reject(error.res.data)   // 返回接口返回的错误信息
});
export default instance;
