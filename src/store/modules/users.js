

const users = {
  namespaced: true,
  state: {
    isLogin: false,  
  },
  getters: {

  },
  mutations: {
    SET_LOGIN(state, data) {
      state.isLogin = data
    },
    
  },
  actions: {
    DISPATCH_LOGIN({ commit }, data) {
      commit('SET_LOGIN', data)
    },
   
  }

}
export default users
