<template>
  <v-app-bar app flat color="primary" dark>
    <v-app-bar-nav-icon v-if="!inPopup && $route.path !=='/'">
      <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title>{{ title }}</v-app-bar-title>
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
    }
  }
})
</script>
