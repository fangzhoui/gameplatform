import http from "./request"
const path = {
  list: "api/banner/list"
};
export default {
  // 热门搜索
  bannerList(params){
    return http.get(path.list, params);
  }
};