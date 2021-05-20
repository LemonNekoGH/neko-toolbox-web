<template>
  <v-app>
    <Header in-popup="true"></Header>
    <Favorites in-popup="true"></Favorites>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Favorites from '@/views/Favorites.vue'
import Header from '@/components/Header.vue'
export default Vue.extend({
  components: {
    Header,
    Favorites
  }
})
</script>
