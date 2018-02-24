import Vue from 'vue'

export default {
    state: {
        ratingText: {}, // 单条评论
        ratingTextShow: false, // 显示评论页面
        complaintShow: false, // 显示投诉页面
        ratingList: [], // 评论列表
        ratingCount: 0, // 评论条数
        titleShow: true,
        scrollT: 0,
        ratingtype: 0, // 评论类型
        gameName: '', //浏览的游戏名字
        selectPart: '1', // 意见反馈选中
        selectPartLetter: '1', // 站内信选中
        selectPartHistroy: '1', // 历史记录选中
    },
    mutations: {
        RATING_TEXT(state, current){
            state.ratingText = current
        },
        RATING_TEXT_SHOW(state, current){
            state.ratingTextShow = current
        },
        RATING_LIST(state, current){
            state.ratingList = current
        },
        PUSH_LIST(state, current){
            state.ratingList.push(current)
        },
        UN_SHIFT(state, current){
            state.ratingList.unshift(current)
        },
        COMOLAUNT_SHOW(state, current){
            state.complaintShow = current
        },
        TITLE_SHOW(state, current){
            state.titleShow = current
        },
        SCROLL_T(state, current){
            state.scrollT = current
        },
        RATING_TYPE(state, current){
            state.ratingtype = current
        },
        RATING_COUNT(state, current){
            state.ratingCount = current
        },
        GAME_NAME(state, current){
            state.gameName = current
        },
        SELECT_PART(state, current){
            state.selectPart = current
        },
        SELECT_PART_LETTER(state, current){
            state.selectPartLetter = current
        },
        SELECT_PART_HISTROY(state, current){
            state.selectPartHistroy = current
        }
    },
    actions: {
        ratingtext(state, current){
            state.commit('RATING_TEXT', current)
        },
        ratingTextShow(state, current){
            state.commit('RATING_TEXT_SHOW', current)
        },
        ratingList(state, current){
            state.commit('RATING_LIST', current)
        },
        pushList(state, current){
            state.commit('PUSH_LIST', current)
        },
        unshiftList(state, current){
            state.commit('UN_SHIFT', current)
        },
        complaintShow(state, current){
            state.commit('COMOLAUNT_SHOW', current)
        },
        titleShow(state, current){
            state.commit('TITLE_SHOW', current)
        },
        scrollT(state, current){
            state.commit('SCROLL_T', current)
        },
        ratingType(state, current){
            state.commit('RATING_TYPE', current)
        },
        ratingCount(state, current){
            state.commit('RATING_COUNT', current)
        },
        gameName(state, current){
            state.commit('GAME_NAME', current)
        },
        selectPart(state, current){
            state.commit('SELECT_PART', current)
        },
        selectPartLetter(state, current){
            state.commit('SELECT_PART_LETTER', current)
        },
        selectPartHistroy(state, current){
            state.commit('SELECT_PART_HISTROY', current)
        },
    },
    getters: {
		getratingtext(state){
			return state.ratingText
		},
        getratingTextShow(state){
            return state.ratingTextShow
        },
        getratingList(state){
            return state.ratingList
        },
        getComplaint(state){
            return state.complaintShow
        },
        getTitleShow(state){
            return state.titleShow
        },
        getScrollT(state){
            return state.scrollT
        },
        getRatingType(state){
            return state.ratingtype
        },
        getRatingCount(state){
            return state.ratingCount
        },
        getGameName(state){
            return state.gameName
        },
        getSelectPart(state){
            return state.selectPart
        },
        getSelectPartLetter(state){
            return state.selectPartLetter
        },
        getSelectPartHistroy(state){
            return state.selectPartHistroy
        }
	}
}
