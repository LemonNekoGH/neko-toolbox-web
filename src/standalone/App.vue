<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'

export default Vue.extend({
  components: {
    Header
  }
})
</script>

<style lang="less" src="../App.less">
</style>
