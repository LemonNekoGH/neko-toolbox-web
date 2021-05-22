<template>
  <v-main>
    <v-container>
      <div class="tools-grid">
        <v-card outlined v-for="(tool, index) in toolsPinnedFirst" :key="index" @click="$router.push(tool.to)">
          <v-app-bar flat color="white">
            <v-app-bar-title>
              {{ $t(tool.title) }}
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="setPinned(tool.to, !tool.isPinned)">
              <v-icon>{{ tool.isPinned ? 'mdi-pin' : 'mdi-pin-outline' }}</v-icon>
            </v-btn>
            <v-btn icon @click.stop="setFavorite(tool.to, !tool.isFavorite)">
              <v-icon>{{ tool.isFavorite ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
            </v-btn>
          </v-app-bar>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import Vue from 'vue'
import { Storage, TypeCast } from '@/utils/util'

export default Vue.extend({
  computed: {
    toolsPinnedFirst () {
      const tools: Array<{ to: string, title: string, isFavorite: boolean, isPinned: boolean }> = []
      this.tools.forEach((it) => {
        if (it.isFavorite || it.isPinned) {
          tools.push(it)
        }
      })
      this.tools.forEach((it) => {
        if (!it.isFavorite && !it.isPinned) {
          tools.push(it)
        }
      })
      return tools
    }
  },
  data () {
    return {
      tools: [
        { to: '/http-client', title: 'httpClient.title', isFavorite: false, isPinned: false }
      ]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    setFavorite (to: string, isFavorite: boolean) {
      for (const it of this.tools) {
        if (it.to === to) {
          it.isFavorite = isFavorite
          break
        }
      }
      Storage.setItem(`${to}:isFavorite`, String(isFavorite))
    },
    setPinned (to: string, isPinned: boolean) {
      for (const it of this.tools) {
        if (it.to === to) {
          it.isPinned = isPinned
          break
        }
      }
      Storage.setItem(`${to}:isPinned`, String(isPinned))
    },
    initData () {
      this.tools.forEach(async (it) => {
        it.isFavorite = TypeCast.stringToBoolean(await Storage.getItem(`${it.to}:isFavorite`, 'false'))
        it.isPinned = TypeCast.stringToBoolean(await Storage.getItem(`${it.to}:isPinned`, 'false'))
      })
    }
  }
})
</script>
<style lang="less" scoped>
.tools-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
