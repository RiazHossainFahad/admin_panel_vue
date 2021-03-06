import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: [],
    userList: [],
    user: [],
    role: [],
    msg: '',
    import: []
  },
  mutations: {
    SET_USER_PROFILE (state, payload) {
      state.userProfile = payload
    },

    SET_USER_LIST (state, payload) {
      state.userList = payload
    },

    SET_USER (state, payload) {
      state.user = payload
    },

    SET_ROLE (state, payload) {
      state.role = payload
    },

    SET_MSG (state, payload) {
      state.msg = payload
    },

    SET_IMPORT (state, payload) {
      state.import = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      return axios.post('/api/login', payload).then((result) => {
        commit('SET_USER_PROFILE', result.data.success.data)
        localStorage.setItem('token', `Bearer ${result.data.success.token}`)
      }).catch((err) => {
        console.log(err)
      })
    },

    getUsers ({ commit }) {
      return axios.get('/api/user', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(result => {
          console.log(result.data.data)
          commit('SET_USER_LIST', result.data.data)
        })
        .catch(err => console.log(err))
    },
    getSingleUser ({ commit }, id) {
      return axios.get(`/api/user/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(result => {
          // console.log(result.data.data)
          commit('SET_USER', result.data.data)
        })
        .catch(err => console.log(err))
    },
    getRole ({ commit }) {
      return axios.get(`/api/role`)
        .then(result => {
          // console.log(result.data.data)
          commit('SET_ROLE', result.data.data)
        })
        .catch(err => console.log(err))
    },
    insertInfo ({ commit }, payload) {
      return axios.post('/api/user', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).then(result => {
        commit('SET_MSG', result.data.success.msg)
        // console.log(result.data.success.data)
      }).catch(err => console.log(err.response.data.error))
    },
    updateInfo ({ commit }, info) {
      return axios.put(`/api/user/${info.id}`, info.data, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(result => {
        })
        .catch(err => console.log(err))
    },
    userDelete ({ commit }, id) {
      return axios.delete(`/api/user/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(result => {
        })
        .catch(err => console.log(err))
    },
    import ({ commit }, payload) {
      return axios.post('/api/import', payload, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      }).then(result => {
        commit('SET_IMPORT', result.data.data)
      }).catch(err => console.log(err))
    },
    logout ({ commit }) {
      localStorage.removeItem('roles')
      return axios.get(`/api/logout`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(result => {
        })
        .catch(err => console.log(err))
    }
  }
})
