import http from "./request"
const path = {
  complaintList: "api/complaint/V2/complaintList", // 投诉列表
  suggestionList: "api/complaint/V2/suggestionList", // 意见列表
  suggestionDetail: 'api/complaint/suggestionDetail', // 意见详情
  insertComplaint: "api/complaint/insertComplaint", // 投诉提交
  commentList: "api/comment/commentList",  // 评论列表
  insert: "api/comment/insert", // 插入评论
  favorInsert: "api/favor/insert", // 点赞
  optionsList: 'api/complaint/optionsList', // 投诉选项
  insertSuggestion: 'api/complaint/insertSuggestion', // 意见反馈提交
  complaintDetail: 'api/complaint/complaintDetail', // 投诉详情
  letterList: 'api/message/V2/list', // 站内信列表
  letterDetail: 'api/message/detail', // 站内信详情
  beCommentList: 'api/comment/beCommentList', //消息中心评论列表
  beCommentDetail: 'api/comment/beCommentDetail', //消息中心评论列表详情
  userFourStatus: 'api/user/userMessageStatus', // 用户界面红点状态
  checkRead: 'api/message/checkRead', // 站内信是否未读
};
export default {
  // 投诉列表
  complaintList(params){
    return http.get(path.complaintList, params);
  },
  // 意见列表
  suggestionList(params){
    return http.get(path.suggestionList, params);
  },
  // 意见详情
  suggestionDetail(params){
    return http.get(path.suggestionDetail, params);
  },
  // 投诉提交
  insertComplaint(params){
    return http.post(path.insertComplaint, params);
  },
  // 评论列表
  commentList(params){
    return http.get(path.commentList, params);
  },
  // 添加评论
  insert(params){
    return http.post(path.insert, params);
  },
  // 点赞
  favorInsert(params){
    return http.post(path.favorInsert, params);
  },
  // 投诉选项
  optionsList(params){
    return http.get(path.optionsList, params);
  },
  // 意见提交
  insertSuggestion(params){
    return http.post(path.insertSuggestion, params);
  },
  // 投诉详情
  complaintDetail(params){
    return http.get(path.complaintDetail, params);
  },
  // 站内信列表
  letterList(params){
    return http.get(path.letterList, params);
  },
  // 站内信详情
  letterDetail(params){
    return http.get(path.letterDetail, params);
  },
  // 消息中心评论列表
  beCommentList(params){
    return http.get(path.beCommentList, params);
  },
  // 消息中心评论列表详情
  beCommentDetail(params){
    return http.get(path.beCommentDetail, params);
  },
  // 用户界面红点接口
  userFourStatus(params){
    return http.get(path.userFourStatus, params);
  },
  // 站内信是否未读
  checkRead(params){
    return http.get(path.checkRead, params);
  }
};
