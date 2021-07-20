import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import nprogress from 'nprogress'

Vue.config.productionTip = false
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded'
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [
  function (data) {
    let ret = ''
    for (const it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }
]
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8081/'
// 添加拦截器 在请求拦截器显示进度条 在相应拦截器隐藏进度条
axios.interceptors.response.use(config => {
  nprogress.done()
  return config
})
axios.interceptors.request.use(
  config => {
    nprogress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
