import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './iconfont/iconfont.css'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
//请求拦截
axios.interceptors.request.use(config => {
  if ("prod-api/common/login" != config.url) {
    if (localStorage.getItem("token")) {
      //请求头
      config.headers['Authorization'] = localStorage.getItem("token")
      //console.log(localStorage.getItem("token"))
      // 让每个请求携带自定义token 请根据实际情况自行修
    }
  }
  return config;
}, err => {
  // todo 待完善接口拦截
  return Promise.reject(err);
});
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
