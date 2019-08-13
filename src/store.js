import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import data from '@/assets/all-data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList: []
  },
  mutations: {
    SET_USER_LIST (state, payload) {
      state.userList = payload
    }
  },
  actions: {
    getUsers ({ commit }) {
      return axios.get('/api/user', {
        headers: {
          'Authorization': data.token
        }
      })
        .then(result => {
          console.log(result.data.data)
          commit('SET_USER_LIST', result.data.data)
        })
        .catch(err => console.log(err))
    }
  }
})
