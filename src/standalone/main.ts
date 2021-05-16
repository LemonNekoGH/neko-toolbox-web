import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  render: h => h(App)
})
