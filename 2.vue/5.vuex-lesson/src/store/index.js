import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'hello world'
  },
  mutations: {
    setMessage(state, message) {
      debugger
      state.message = message
    }
  },
  getters: {
    getMessage(state) {
      
      return state.message
    }
  },
  actions: {
    setMessageAsync(store, message) {
      setTimeout(()=>{
        store.commit('setMessage', message)
      },2000)
    }
  },
  modules: {
    a: {
      namespaced: true,
      state: {
        message: 'hello a'
      },
      mutations: {
        setMessage(state, message) {
          state.message = message + "_a"
        }
      }
    },
    b: {
      state: {
        message: 'hello b'
      }
    }
  }
})
