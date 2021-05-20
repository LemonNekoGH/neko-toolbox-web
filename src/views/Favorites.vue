<template>
  <v-main>Favorites</v-main>
</template>
<script lang="ts">
import Vue from 'vue'
import { EnvDetector, RunningEnv } from '@/utils/util'

export default Vue.extend({
  data () {
    return {
      env: RunningEnv.common
    }
  },
  mounted () {
    this.env = EnvDetector.detectEnv()
  }
})
</script>
