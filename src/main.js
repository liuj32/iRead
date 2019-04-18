// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import '../static/css/iconfont.css'  
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Loading from  './utils'


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.axios = axios;
//使用mini-ui
Vue.use(MintUI);
Vue.use(Loading)
/* eslint-disable no-new */
/**
 * 
 */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
