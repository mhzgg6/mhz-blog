import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//  导入element-ui
import ElementUI from './assets/element_ui/elementConfig'
import './assets/element_ui/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
//  导入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
//  导入icon.js
import './assets/icon/iconfont'
import request from './assets/axios/index'
//  导入全局方法
import getTime from '../unit/getTime'
//  导入封装组件
import Alert from './components/alert/alert'
//  导入图片懒加载
import VueLazyload from 'vue-lazyload'
//  
import '../unit/flexible'
import VueCropper from 'vue-cropper' 


Vue.prototype.$axios = axios
Vue.prototype.$getTime = getTime
Vue.prototype.$Alert = Alert



Vue.config.productionTip = false
Vue.use(request)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(VueCropper)
Vue.use(VueLazyload,{
  error:'http://cdn.mhzgg.com/loading.gif',//图片加载失败时候显示的图片
  loading:'http://cdn.mhzgg.com/loading.gif'//图片还未加载完成时候的loading图片
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
