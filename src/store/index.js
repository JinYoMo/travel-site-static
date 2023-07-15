import Vue from 'vue'
import Vuex from 'vuex';
import users from './modules/users'

const state = {
}

const mutations = {

}

const getters = {

}

const actions = {

}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    users
  }
})
