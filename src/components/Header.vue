<template>
  <v-app-bar app flat color="primary" dark>
    <v-app-bar-nav-icon v-if="!inPopup && $route.path !=='/'" @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-btn text>
      <v-app-bar-title>{{ $t('basic.title') }}</v-app-bar-title>
    </v-btn>
    <div class="width-10px"></div>
    <v-btn :color="favoriteColor()" elevation="0" @click="$router.push('/favorites')" v-if="!inPopup && !inOptions">
      <v-icon left >mdi-folder-star</v-icon>
      收藏夹
    </v-btn>
    <div class="width-10px"></div>
    <v-btn :color="settingsColor()" elevation="0" @click="goSetting" v-if="!inPopup && !inOptions">
      <v-icon left>mdi-cog</v-icon>
      设置
    </v-btn>
  </v-app-bar>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
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
  methods: {
    goSetting () {
      if (this.inPopup) {
        browser.tabs.create({
          url: 'options.html'
        })
      } else {
        this.$router.push('/settings')
      }
    },
    favoriteColor () {
      return this.$route.path === '/favorites' ? '#c75b39' : '#ff8a65'
    },
    settingsColor () {
      return this.$route.path === '/settings' ? '#c75b39' : '#ff8a65'
    }
  }
})
</script>
