<template>
  <v-main>
    <v-container>
      <div class="tools-grid">
        <v-card outlined v-if="tools.length === 0">
          <v-app-bar flat color="white">
            <v-app-bar-title>{{ $t('favorites.noFavorites') }}</v-app-bar-title>
          </v-app-bar>
        </v-card>
        <v-card
          outlined
          v-for="(tool, index) in tools"
          :key="index"
          @click="$router.push(tool.to)">
          <v-app-bar
            flat
            color="white">
            <v-app-bar-title>
              {{ $t(tool.title) }}
            </v-app-bar-title>
            <v-spacer />
            <v-tooltip>
              <template #activator="{ attr, on }">
                <v-btn
                  icon
                  @click.stop="tool.setPinned(!tool.isPinned)"
                  v-bind="attr"
                  v-on="on">
                  <v-icon>{{ tool.isPinned ? 'mdi-pin' : 'mdi-pin-outline' }}</v-icon>
                </v-btn>
              </template>
              {{ tool.isPinned ? $t('basic.unPin') : $t('basic.pin') }}
            </v-tooltip>
            <v-tooltip>
              <template #activator="{ attr, on }">
                <v-btn
                  v-bind="attr"
                  v-on="on"
                  icon
                  @click.stop="tool.setFavorite(!tool.isFavorite)">
                  <v-icon>{{ tool.isFavorite ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
                </v-btn>
              </template>
              {{ tool.isFavorite ? $t('basic.removeFromFavorites') : $t('basic.addToFavorites') }}
            </v-tooltip>
          </v-app-bar>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import Vue from 'vue'
import { EnvDetector, RunningEnv, Storage, Tool, tools, TypeCast } from '@/utils/util'

type Data = {
  env: RunningEnv,
  allTools: Tool[]
}

export default Vue.extend({
  data (): Data {
    return {
      env: RunningEnv.common,
      allTools: tools
    }
  },
  computed: {
    tools (): Tool[] {
      return this.allTools.filter((it: Tool) => it.isFavorite)
    }
  },
  mounted () {
    this.env = EnvDetector.detectEnv()
    document.title = `${this.$t('basic.title')} - ${this.$t('favorites.title')}`
  },
  methods: {
    initData () {
      this.allTools.forEach(async (it) => {
        it.isFavorite = TypeCast.stringToBoolean(await Storage.getItem(`${it.to}:isFavorite`, 'false'))
        it.isPinned = TypeCast.stringToBoolean(await Storage.getItem(`${it.to}:isPinned`, 'false'))
      })
    }
  }
})
</script>
<style lang="less">
.tools-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>
