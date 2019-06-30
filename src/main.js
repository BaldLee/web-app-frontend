import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import global_ from "@/components/Global.vue";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8082"
Vue.prototype.$http = axios
Vue.prototype.$global = global_;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

