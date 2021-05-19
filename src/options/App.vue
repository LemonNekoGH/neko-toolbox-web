<template>
  <v-app>
    <Settings in-options="true"></Settings>
  </v-app>
</template>

<script>
import Settings from '@/views/Settings'

export default {
  name: 'App',
  components: { Settings }
}
</script>
