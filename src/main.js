import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI/index'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import httpClient from "./HttpClient"
import { v4 } from "uuid"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.prototype.$client = httpClient
Vue.prototype.$uuid = v4
Vue.prototype.$b64DecodeUnicode = function(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), 
  function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}
Vue.prototype.$getCookie = function(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

components.forEach(component => {
  Vue.component(component.name, component)
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
