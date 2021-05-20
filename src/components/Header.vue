<template>
  <v-app-bar app flat color="primary" dark>
    <v-btn text>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-btn>
    <div class="width-10px"></div>
    <v-tabs v-if="!inPopup && !inOptions">
      <v-tab to="/">
        <v-icon left>mdi-home</v-icon>
        {{ $t('home.title') }}
      </v-tab>
      <v-tab to="/favorites">
        <v-icon left>mdi-folder-star</v-icon>
        {{ $t('favorites.title') }}
      </v-tab>
      <v-tab to="/settings">
        <v-icon left>mdi-cog</v-icon>
        {{ $t('settings.title') }}
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
  methods: {
    goUrl (url: string) {
      browser.tabs.create({
        url: url
      })
    }
  }
})
</script>
