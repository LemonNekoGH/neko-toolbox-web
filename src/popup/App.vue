<template>
  <v-app>
    <Header :in-popup="true"></Header>
    <Favorites></Favorites>
  </v-app>
</template>
<script lang="ts">
import Favorites from '@/views/Favorites.vue'
import Header from '@/components/Header.vue'
import { HookedVue } from '@/utils/util'

export default HookedVue.extend({
  components: {
    Header,
    Favorites
  }
})
</script>
