export default {
	state: {
		bannerImg: [],
		addShow: true
	},
	mutations: {
		SET_BANNER_IMG(state, obj){
			if(obj == 'clear'){
				state.bannerImg = []
			}else{
				state.bannerImg.push(obj)
			}
		},
		DELETE_IMAGE(state, obj){
			state.bannerImg.splice(obj, 1)
		},
		SET_ADD_SHOW(state, current){
			state.addShow = current
		}
	},
	actions:{
		set_banner_img(state, obj){
			state.commit('SET_BANNER_IMG', obj)
		},
		delete_img(state, obj){
			state.commit('DELETE_IMAGE', obj)
		},
		set_add_show(state, obj){
			state.commit('SET_ADD_SHOW', obj)
		}
	},
	getters: {
		get_banner_img(state){
			return state.bannerImg
		},
		getAddShow(state){
			return state.addShow
		},
	}
}