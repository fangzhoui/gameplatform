/**
 * Created by fanyulong on 2017/5/17.
 */
import axios from './index'
import http from './request'
import md from 'js/md5'
import Vue from 'vue'

const path = {
  createToken: 'api/user/token/create'
}
const sign_key = 'ZVdvn7JgYmcwF21AYpXUffnW7CgYIsAm';
var tokenVal = localStorage.getItem('token');
export default {
  createToken () {
    let form = new FormData();
    let url = path.createToken;
    let params = {};
    try{
      tokenVal = JSON.parse(tokenVal)
    }catch(err){
      tokenVal = tokenVal;
    }
    if(!!tokenVal){
      params = {
        token: tokenVal
      }
    }
    let tem = (new Date()).valueOf();
    let newObj = {
      timestamp: tem,
      protocol_version: '1.0.1'
    }
    Object.assign(params, newObj)
    let arr = []
    let str = ''
    for(let a of Object.keys(params)){
      arr.push(a)
    }
    let arrSort = arr.sort()
    for(let b of arrSort){
      let val = params[b]
      str += `${b}=${val}&`
      form.append(b, val)
    }
    let newStr = `${str}${sign_key}`
    newStr = encodeURIComponent(newStr).toLocaleUpperCase();
    let sign = md.hex_md5(newStr);
    url = `${url}?sign=${sign}`;
    return axios.post(url, form).then(function (responce) {
      if(responce.data.code == '0'){
        var tokens = responce.data.data;
        try{
          tokens = JSON.parse(tokens)
        }catch(err){
          tokens = tokens;
        }
        if(tokenVal != tokens){
          localStorage.removeItem('logged-in');
          location.reload()
        }
        localStorage.setItem("token", tokens);
        if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
          sessionStorage.setItem('okToken', '1');
        } else { 
          sessionStorage.setItem('okToken', '1');
        }
      }
    })
  }
};
