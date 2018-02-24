import Vue from 'vue'
import Router from 'vue-router'
import picurl from 'api/picurl'
import token from 'api/token'
import user from 'api/user'

const Home = resolve=>System.import('components/home')
const gameDel = resolve=>System.import('components/pages/gamedel/gameDel')
const packageDel = resolve=>System.import('components/pages/packagedel/packagedel')
const giftCenter = resolve=>System.import('components/pages/giftcenter/giftcenter')
const login = resolve=>System.import('components/pages/login/login')
const forget = resolve=>System.import('components/pages/login/forgetpass')
const register = resolve=>System.import('components/pages/login/register')
const search = resolve=>System.import('components/pages/search/searchpage')
const histroy = resolve=>System.import('components/pages/mine/histroy')
const aboutWe = resolve=>System.import('components/pages/mine/aboutwe')
const changePassWord = resolve=>System.import('components/pages/mine/changepassword')
const information = resolve=>System.import('components/pages/mine/information')
const feedback = resolve=>System.import('components/pages/mine/feedback')
const histroyfeed = resolve=>System.import('components/pages/mine/histroyfeed')
const proposal = resolve=>System.import('components/pages/mine/proposal')
const complaintPart = resolve=>System.import('components/pages/mine/complaintpart')
const articlePart = resolve=>System.import('components/pages/article/article')
const letter = resolve=>System.import('components/pages/mine/letter')
const letterdesc = resolve=>System.import('components/pages/mine/letterdesc')
const commidrating = resolve=>System.import('components/pages/mine/commidrating')
const commiddesc = resolve=>System.import('components/pages/mine/commiddesc')
const changeinfo = resolve=>System.import('components/pages/mine/changeinfo')
const maintain = resolve=>System.import('components/pages/maintain/maintain')
const mypackage = resolve=>System.import('components/pages/mine/mypackage')
// const test = resolve=>System.import('components/pages/test/testtwo')

Vue.use(Router)
const routes = [
// 主页
    {
      path: '/',
      name: 'home',
      component: Home
    },
    //游戏详情页
    {
      path: '/gameDel/:id',
      name: 'gameDel',
      component: gameDel,
      props: true 
    },
    // 礼包详情页
    {
      path: '/packageDel',
      name: 'packageDel',
      component: packageDel
    },
    // 礼包中心
    {
      path: '/giftcenter',
      name: 'giftcenter',
      component: giftCenter
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 忘记密码
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // 搜索页
    {
      path: '/search',
      name: 'search',
      component: search
    },
    // 历史记录页
    {
      path: '/histroy',
      name: 'histroy',
      component: histroy
    },
    // 关于我们
    {
      path: '/aboutwe',
      name: 'aboutwe',
      component: aboutWe
    },
    // 密码修改
    {
      path: '/changepassword',
      name: 'changepassword',
      component: changePassWord
    },
    // 修改个人信息
    {
      path: '/information',
      name: 'information',
      component: information,
    },
    {
      path: '/changeinfo',
      name: 'changeinfo',
      component: changeinfo
    },
    // 意见反馈
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    // 历史反馈
    {
      path: '/histroyfeed',
      name: 'histroyfeed',
      component: histroyfeed
    },
    // 意见反馈详情页
    {
      path: '/proposal',
      name: 'proposal',
      component: proposal
    },
    // 投诉详情页
    {
      path: '/complaintpart',
      name: 'complaintpart',
      component: complaintPart
    },
    // 文章详情页
    {
      path: '/articlePart',
      name: 'article-wrap',
      component: articlePart
    },
    // 消息中心
    {
      path: '/letter',
      name: 'letter',
      component: letter
    },
    // 站内信详情
    {
      path: '/letterdesc',
      name: 'letter-desc',
      component: letterdesc
    },
    // 对我评论的回复页
    {
      path: '/commidrating',
      name: 'commid-rating',
      component: commidrating
    },
    // 对我评论的详情页
    {
      path: '/commiddesc',
      name: 'commid-desc',
      component: commiddesc
    },
    // 维护页
    {
      path: '/maintain',
      name: 'maintain-page',
      component: maintain
    },
    //我的礼包
    {
      path: '/mypackage',
      name: 'mypackage',
      component: mypackage
    }
  ]
const router = new Router({
    routes
});

router.beforeEach(async(to, from, next) => {
  if(sessionStorage.getItem('okToken') != '1'){
    await token.createToken();
    user.vindicate().then(res => {
      if(res.data.code == '0'){
        sessionStorage.setItem('isVindicate', true)
        if(!!res.data.data){
          next('/maintain');
        }
      }
    })
  }
  if (sessionStorage.getItem("puburl")) {
    next();
  } else {
    picurl.imageUrl().then((res) => {
      if(res.data.code == '0'){
        let p = res.data.data;
        sessionStorage.setItem('puburl', p);
        next();
      }
    })      
  }
});

export default router;
