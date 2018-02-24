export default {
	state: {
		cdk: '',
		showCdk: false,
		fromWhere: 'game',
		gamedel: {}
	},
	mutations: {
		CDK(state, obj){
			state.cdk = obj
		},
		SHOWCDK(state, obj){
			state.showCdk = obj
		},
		FROM_WHERE(state, obj){
			state.fromWhere = obj
		},
		GAMEDEL(state, obj){
			state.gamedel = obj
		}
	},
	actions:{
		cdk(state, obj){
			state.commit('CDK', obj)
		},
		showcdy(state, obj){
			state.commit('SHOWCDK', obj)
		},
		fromwhere(state, obj){
			state.commit('FROM_WHERE', obj)
		},
		setgamedel(state, obj){
			state.commit('GAMEDEL', obj)
		}
	},
	getters: {
		get_cdy(state){
			return state.cdk
		},
		show_cdk(state){
			return state.showCdk
		},
		getFromWhere(state){
			return state.fromWhere
		},
		getGameDel(state){
			return state.gamedel
		}
	}
}