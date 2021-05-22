<template>
  <v-app>
    <Header></Header>
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
  </v-app>
</template>
<script lang="ts">
import Header from '@/components/Header.vue'
import { HookedVue } from '@/utils/util'

export default HookedVue.extend({
  components: {
    Header
  }
})
</script>

<style lang="less" src="../App.less">
</style>
