import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './register.js'

Vue.config.productionTip = false

import './common/stylus/index.styl'

new Vue({
  render: (h) => h(App)
}).$mount('#app')
