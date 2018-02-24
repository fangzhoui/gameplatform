export default {
  //当前状态
    state: {
        index: 0,
        showSwipe: false,
        gameId: 0,
        images: []
    },
  //同步状态更新
    mutations: {
        SHOW_SWIPE(state, current){
            state.showSwipe = current
        },
        SET_INDEX(state, current){
        	state.index = current
        },
        SET_GAMEID(state, current){
        	state.gameId = current
        },
        SET_IMAGES(state, current){
            state.images = current
        }
    },
  //异步方法
    actions: {
        showswipe(state, current){
            state.commit('SHOW_SWIPE', current)
        },
        setindex(state, current){
            state.commit('SET_INDEX', current)
        },
        setgameid(state, current){
        	state.commit('SET_GAMEID', current)
        },
        setimages(state, current){
            state.commit('SET_IMAGES', current)
        }
    },
    getters: {
		getIndex(state){
			return state.index
		},
		getShowSwipe(state){
			return state.showSwipe
		},
		getGameId(state){
			return state.gameId
		},
        getImages(state){
            return state.images
        }
	}
}
