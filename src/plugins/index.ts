import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import zh from '@/locales/zh'
import VueRouter from 'vue-router'
import store from './store'
import Vue from 'vue'

import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(VueRouter)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff8a65'
      }
    }
  }
})

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_LOCALE || 'en',
  messages: {
    zh
  }
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  routes
})

export const plugins = {
  vuetify,
  i18n,
  router,
  store
}
