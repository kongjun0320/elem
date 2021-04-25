import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './register.js'

Vue.config.productionTip = false

import './common/stylus/index.styl'
import router from './router'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
