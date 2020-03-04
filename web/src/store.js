import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    _id: window.localStorage.getItem('_id') || '',
    username: window.localStorage.getItem('username') || '',
    token: window.localStorage.getItem('token') || '',
    avater: window.localStorage.getItem('avater') || '',
    isLogin: window.localStorage.getItem('isLogin') || false
  },
  showLogin: false,
  isMoble: false,
  liIndex: -1        
}
const mutations = {
  //  存储信息到localStorage
  save: (state, data) => {
    state.user._id = data._id
    state.user.username = data.username
    state.user.token = data.token
    state.user.avater = data.avater
    state.user.isLogin = data.isLogin
    
    window.localStorage.setItem('_id', data._id)
    window.localStorage.setItem('username', data.username)
    window.localStorage.setItem('token', data.token)
    window.localStorage.setItem('avater', data.avater)
    window.localStorage.setItem('isLogin', data.isLogin)
  },
  changeAvater: (state, data) => {
    state.user.avater = data.avater
    window.localStorage.setItem('avater', data.avater)
  },
  //  移除localStorage的信息
  remove: (state) => {
    state.user._id = ''
    state.user.username = ''
    state.user.token = ''
    state.user.avater = ''
    state.user.isLogin = false

    window.localStorage.removeItem('_id')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('avater')
    window.localStorage.removeItem('isLogin')
  },
  updateLogin(state,status) {
    state.showLogin = status
  },
  updateIsMoble(state,status) {
    state.isMoble = status
  },
  updateLiIndex(state, status) {
    state.liIndex = status
  }
}


export default new Vuex.Store({
  state,
  mutations
})
