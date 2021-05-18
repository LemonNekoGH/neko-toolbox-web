<template>
  <v-app>
    <Header :title="$t('basic.title')"></Header>
  </v-app>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: { Header }
}
</script>
