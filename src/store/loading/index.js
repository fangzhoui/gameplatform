export default {
	state: {
		loadingShow: false,
		loadwranOption: {
			show: false,
			text: '加载失败，请重新加载'
		},
	},
	mutations: {
		SHOWLOADING(state, obj){
			state.loadingShow = obj
		},
		SHOWLOADWRAN(state, obj){
			state.loadwranOption = obj
		},
	},
	actions:{
		showloading(state, obj){
			state.commit('SHOWLOADING', obj)
		},
		showloadwran(state, obj){
			state.commit('SHOWLOADWRAN', obj)
		}
	},
	getters: {
		getloadingshow(state){
			return state.loadingShow
		},
		getloadwranshow(state){
			return state.loadwranOption.show
		},
		getloadwrantext(state){
			return state.loadwranOption.text
		}
	}
}