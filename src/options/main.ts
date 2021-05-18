import Vue from 'vue'
import App from './App.vue'
import { plugins } from '@/plugins'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  ...plugins,
  render: h => h(App)
})
