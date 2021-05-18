import Vue from 'vue'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { plugins } from '@/plugins'

Vue.config.productionTip = false

new Vue({
  ...plugins,
  render: h => h(App)
}).$mount('#app')
