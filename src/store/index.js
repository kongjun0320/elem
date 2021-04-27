import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import { signIn, getUser } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    login(state, payload) {
      state.token = payload
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async login({ commit }, payload) {
      const { token, loginUser: user } = await signIn(payload)
      commit('login', token)
      commit('setUser', user)
      // localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      return {
        token,
        user
      }
    },
    async getUserInfo({ commit }) {
      const res = await getUser()
      commit('setUser', res)
      return res
    },
    loginAngUser({ dispatch }, payload) {
      return dispatch('login', payload)
      // return dispatch('login', payload).then(() => {
      //   return dispatch('getUserInfo')
      // })
    }
  },
  modules: {}
})
