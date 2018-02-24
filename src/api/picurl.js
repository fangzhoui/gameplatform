import http from "./request"
const path = {
  imageURL: 'api/common/qiniuBaseUrl',
};
export default {
  // 图片头
  imageUrl(params){
    return http.get(path.imageURL, params)
  }
};