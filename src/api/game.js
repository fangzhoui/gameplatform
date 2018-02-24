import http from "./request"
const path = {
  activityWelfare: "api/game/activityWelfare",
  activityPackage: "api/game/activityPackage",
  categoryDetail: "api/game/categoryDetail",
  categoryList: "/api/game/categoryList",
  categroyGameList: "api/game/V2/categoryGameList",
  details: "api/game/details",
  homeList: 'api/game/V3/topicBySection',
  topicList: 'api/game/V2/topicList',
  gameList: 'api/game/gameList',
  gameTop6: 'api/game/gameTop6',
  hotSearch: 'api/game/hotSearch',
  receive: 'api/game/receive',
  searchDetail: 'api/game/searchDetail',
  searchTop6: 'api/game/searchTop6',
  topicDetail: 'api/game/topicDetail',
  weekList: 'api/game/weekList',
  wonderBefore: 'api/game/wonderBefore',
  hotDown: 'api/history/list',
  historyInsert: 'api/history/insert',
  aboutwe: 'api/webContent/webBySection',
  downloadRecord: 'api/game/downloadRecord',
  discoverList: 'api/article/list',
  articleDetail: 'api/article/detail',
  readRecord: '/api/article/readRecord',
  myPackages: 'api/gamePackeage/myPackages'
};

export default {
  // 活动福利
  activityWelfare(params){
    return http.get(path.activityWelfare,params);
  },
  // 活动礼包
  register(params){
    return http.get(path.activityPackage,params);
  },
  // 分类详情
  categoryDetail(params){
    return http.get(path.categoryDetail,params);
  },
  // 游戏分类列表
  categoryList(params){
    return http.get(path.categoryList,params);
  },
  // 显示分类以及包含的游戏
  categroyGameList(params){
    return http.get(path.categroyGameList,params);
  },
  // 礼包详情
  details(params){
    return http.get(path.details,params);
  },
  // 全部游戏列表
  gameList(params){
    return http.get(path.gameList,params);
  },
  // 游戏排行top6
  gameTop6(params){
    return http.get(path.gameTop6,params);
  },
  // 热门搜索 返回搜索列表
  hotSearch(params){
    return http.get(path.hotSearch,params);
  },
  // 领取礼包
  receive(params){
    return http.get(path.receive,params);
  },
  // 搜索列表 游戏详情
  searchDetail(params){
    return http.get(path.searchDetail,params);
  },
  // 热门搜索排行top6
  searchTop6(params){
    return http.get(path.searchTop6,params);
  },
  // 主题详情
  topicDetail(params){
    return http.get(path.topicDetail,params);
  },
  // 我的下载->本周热门列表
  weekList(params){
    return http.get(path.weekList,params);
  },
  // 往期精彩
  wonderBefore(params){
    return http.get(path.wonderBefore,params);
  },
  // 热门下载
  hotDown(params){
    return http.get(path.hotDown,params);
  },
  // 浏览记录插入
  historyInsert(params){
    return http.post(path.historyInsert,params);
  },
  // 关于我们
  aboutwe(params){
    return http.get(path.aboutwe,params);
  },
   // 下载次数增加
  downloadRecord(params){
    return http.post(path.downloadRecord, params);
  },
   // 获取发现页文章列表
  discoverList(params){
    return http.get(path.discoverList, params);
  },
   // 获取发现页文章详情
  articleDetail(params){
    return http.get(path.articleDetail, params);
  },
   // 主页分类获取
  homeList(params){
    return http.get(path.homeList, params);
  },
   // 主页顶部分类
  topicList(params){
    return http.get(path.topicList, params);
  },
   // 发现页统计点击
  readRecord(params){
    return http.post(path.readRecord, params);
  },
   // 我的礼包
  myPackages(params){
    return http.get(path.myPackages, params);
  }
};
