import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//  导入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
//  导入icon.js
import './assets/icon/iconfont'
import request from './assets/axios/index'

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(request)
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
