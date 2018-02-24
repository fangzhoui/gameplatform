import axios from './index'
const path = {
  list: "api/banner/list"
};
export default {
  // 热门搜索
  bannerList(params){
  	let a;
  	JSsdk.reqApi(params, path.list, (res) => {
	    a = axios.get(res.G)
  	})
  	return a;
  }
};


/****首页引用****/
// <script src="https://5iqianshou.com/public/JSsdk.js"></script>

// /****设置sign_key****/
// JSsdk.setsignkey(sign_key);

// /****获得加密后的参数****/
// JSsdk.reqApi(params, url, callback)

//参数 obj={
//	G: ..., // get请求的Url
//	P: ...,// post请求的Url
//	F: ...,	// 表单提交的参数
//	B: ...	// 非表单提交参数集合
//}


// JSsdk.setsignkey('ZVdvn7JgYmcwF21AYpXUffnW7CgYIsAm');

// JSsdk.reqApi({user: '千妹', password: '111111'}, 'https://5iqianshou.com/api/user/loggin', (res) => {
//     $.ajax({
//         type: "POST",
//         url: res.P,
//         data: res.B,
//         dataType: "json",
//         success: function (data) {
//         	// ...
//         },
//         error: function (jqXHR) {
            
//         }
//     });
// })
