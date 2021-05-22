<template>
  <div>
    <v-app-bar
      app
      flat
      color="primary"
      dark>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mobile" @click="drawerOpen = true">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tabs v-if="!inPopup && !inOptions && !$vuetify.breakpoint.mobile">
        <v-tab v-for="(item, index) in navList" :key="index" :to="item.to">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ $t(item.title) }}
        </v-tab>
      </v-tabs>
      <v-spacer v-if="inPopup"></v-spacer>
      <v-btn v-if="inPopup" icon @click="goUrl('index.html')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn v-if="inPopup" icon @click="goUrl('options.html')">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerOpen" app v-if="$vuetify.breakpoint.mobile">
      <v-list nav dense>
        <v-list-item
          v-for="(item, index) in navList"
          link
          :to="item.to"
          :key="index"
          color="primary">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ $t(item.title) }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    inPopup: {
      type: Boolean,
      required: false,
      default: false
    },
    inOptions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    title () {
      if (this.inPopup) {
        return this.$t('favorites.title')
      } else {
        return this.$t('basic.title')
      }
    }
  },
  data () {
    return {
      drawerOpen: false,
      navList: [
        { to: '/', icon: 'mdi-home', title: 'home.title' },
        { to: '/favorites', icon: 'mdi-folder-star', title: 'favorites.title' },
        { to: '/settings', icon: 'mdi-cog', title: 'settings.title' }
      ]
    }
  },
  methods: {
    goUrl (url: string) {
      browser.tabs.create({
        url: url
      })
    }
  }
})
</script>
<style lang="less">
.v-tabs {
  flex: unset!important;
  width: unset!important;
}
.v-tab {
  text-transform: unset!important;
}
.v-app-bar-title__content {
  width: unset!important;
}
</style>
