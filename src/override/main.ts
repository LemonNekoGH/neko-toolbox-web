import Vue from 'vue'
import App from './App.vue'
import { plugins } from '@/plugins'

new Vue({
  el: '#app',
  ...plugins,
  render: h => h(App)
})
