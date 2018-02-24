export default {
  //当前状态
    state: {
        isLogin: 0,
    },
  //同步状态更新
    mutations: {
        SETLOGIN(state, obj){
            state.isLogin = obj
        },
    },
  //异步方法
    actions: {
        set_login(state, obj){
            state.commit('SETLOGIN', obj)
        },
    },
  //更新之后的状态
    getters: {
        get_loginstate(state){
            return state.isLogin
        },
    }
}
