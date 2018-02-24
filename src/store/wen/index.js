/**
 * Created by fanyulong on 2017/5/25.
 */
export default {
  state: {
    currentNav: '',
    index: 0,
  },
  mutations: {
    SET_NAV(state, nav){
      state.currentNav = nav
    },
    SET_INDEX(state, index){
      state.index = index
    }
  },
  actions: {
    set_nav(state, nav){
      state.commit('SET_NAV', nav)
    },
    set_index(state, index){
      state.commit('SET_INDEX', index)
    },
  },
  getters: {
    get_nav(state){
      return state.currentNav
    },
    get_index(state){
      return state.index
    }
  }
}
