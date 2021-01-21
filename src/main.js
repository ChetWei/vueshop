import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'


//全局样式
import './assets/css/base.css'
//字体图标
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false


import axios from 'axios'
axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/"
Vue.prototype.$http = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
