
import http from "./request"
import axios from './index'
const path = {
  changePassword: "api/user/changePassword",
  forgetPassword: "api/user/forgetPassword",
  info: "api/user/info",
  loginByPassword: "api/user/loginByPassword",
  logout: "api/user/logout",
  register: "api/user/register",
  updateInfo: "api/user/update",
  imageURL: 'api/common/qiniuBaseUrl',
  sendMessage: "api/common/sendMessage",
  version: 'api/version/newVersion',
  update: "api/user/update",
  getQiniuToken: "api/common/getQiniuToken",
  vindicate: 'api/message/vindicate',
  webBySection: 'api/webContent/webBySection',
};
export default {
  // 修改密码
  changePassword(params){
    return http.post(path.changePassword,params);
  },
  // 忘记密码
  forgetPassword(params){
    return http.post(path.forgetPassword,params);
  },
  // 获取用户信息
  info(params){
    return http.get(path.info,params);
  },
  // 账号密码登录
  loginByPassword(params){
    return http.post(path.loginByPassword,params);
  },
  // 退出
  logout(params){
    return http.post(path.logout,params);
  },
  // 注册
  register(params){
    return http.post(path.register,params);
  },
  // 更新个人信息
  updateInfo(params){
    return http.post(path.updateInfo,params);
  },
  // 图片头
  imageUrl(params){
    return http.get(path.imageURL, params)
  },
  // 获取短信验证
  sendMessage(params){
    return http.post(path.sendMessage, params)
  },
  // 最新版本信息
  version(params){
    return http.get(path.version, params)
  },
  // 更新个人信息
  update(params){
    return http.post(path.update, params)
  },
  // 上传头像
  getQiniuToken(params){
    return http.post(path.getQiniuToken, params)
  },
  // 维护
  vindicate(){
    return axios.get(path.vindicate)
  },
  // 维护详情
  webBySection(params){
    return http.get(path.webBySection, params)
  }
};

