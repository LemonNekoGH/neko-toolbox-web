<template>
  <v-app-bar app>
    <v-app-bar-title>{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: String
  }
})
</script>
