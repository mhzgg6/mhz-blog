import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    _id: window.sessionStorage.getItem('_id') || '',
    username: window.sessionStorage.getItem('username') || '',
    token: window.sessionStorage.getItem('token') || '',
    avater: window.sessionStorage.getItem('avater') || ''
  }
}
const mutations = {
  //  存储信息到sessionStorage
  save: (state, data) => {
    state.user._id = data._id
    state.user.username = data.username
    state.user.token = data.token
    state.user.avater = data.avater
    
    window.sessionStorage.setItem('_id', data._id)
    window.sessionStorage.setItem('username', data.username)
    window.sessionStorage.setItem('token', data.token)
    window.sessionStorage.setItem('avater', data.avater)
  },
  //  移除sessionStorage的信息
  remove: (state) => {
    state.user._id = ''
    state.user.username = ''
    state.user.token = ''
    state.user.avater = ''
    
    window.sessionStorage.removeItem('_id')
    window.sessionStorage.removeItem('username')
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('avater')
  }
}


export default new Vuex.Store({
  state,
  mutations
})
