import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import vueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.prototype.$vueHttp = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
