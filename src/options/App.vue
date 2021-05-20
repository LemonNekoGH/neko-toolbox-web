<template>
  <v-app>
    <Header in-options="true"></Header>
    <Settings></Settings>
  </v-app>
</template>

<script>
import Settings from '@/views/Settings'
import Header from '@/components/Header'

export default {
  name: 'App',
  components: { Header, Settings }
}
</script>
