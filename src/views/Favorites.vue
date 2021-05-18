<template>
  <div>
    <Header :title="$t('favorites.title')"></Header>
    <v-main>{{ env }}</v-main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
import { EnvDetector, RunningEnv } from '@/utils/util'

export default Vue.extend({
  components: {
    Header
  },
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
