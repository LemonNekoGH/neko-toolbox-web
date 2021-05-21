<template>
  <v-app>
    <Header :in-options="true"></Header>
    <Settings></Settings>
  </v-app>
</template>

<script>
import Settings from '@/views/Settings'
import Header from '@/components/Header'
import { HookedVue } from '@/utils/util'

export default HookedVue.extend({
  name: 'App',
  components: { Header, Settings }
})
</script>
