import Vue from 'vue'
import Vuex from 'vuex'
console.log(Vuex)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'hello world'
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    }
  },
  getters: {
    getMessage(state) {
      return state.message
    }
  },
  actions: {
    setMessageAsync({commit}, message) {
    }
  },
  modules: {

  }
})
