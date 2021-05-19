<template>
  <v-app>
    <Favorites></Favorites>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Favorites from '@/views/Favorites.vue'
export default Vue.extend({
  components: {
    Favorites
  }
})
</script>
