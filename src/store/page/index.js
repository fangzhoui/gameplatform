export default {
  //当前状态
	state: {
		currentPage: '',
		iswxstate: false,
		isfeed: false, // 隐藏弹出层
	},
  //同步状态更新
	mutations: {
		SET_PAGE(state, current){
			state.currentPage = current
		},
		SET_WXSTATE(state, current){
			state.iswxstate = current;
		},
		SET_FEED(state, current){
			state.isfeed = current;
		}
	},
  //异步方法
	actions: {
		set_page(state, current){
			state.commit('SET_PAGE', current)
		},
		set_wxstate(state, current){
			state.commit('SET_WXSTATE',current)
		},
		set_feed(state,current){
			state.commit('SET_FEED',current)
		}
	},
  //更新之后的状态
	getters: {
		get_page(state){
			return state.currentPage
		},
		get_wxstate(state){
			return state.iswxstate
		},
		get_feed(state){
			return state.isfeed
		}
	}

}
