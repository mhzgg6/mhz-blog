import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//  导入element-ui
import ElementUI from './assets/element_ui/elementConfig'
import './assets/element_ui/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
//  导入ant design vue
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
//  导入icon.js
import './assets/icon/iconfont'
import request from './assets/axios/index'

//  导入编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(request)
Vue.use(ElementUI)
// Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
