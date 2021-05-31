<template>
  <v-main>
    <v-container>
      <div class="tools-grid">
        <v-card
          outlined
          v-for="(tool, index) in toolsPinnedFirst"
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
import { Storage, Tool, tools, TypeCast } from '@/utils/util'

export default Vue.extend({
  computed: {
    toolsPinnedFirst () {
      const tools: Tool[] = []
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
      tools
    }
  },
  mounted () {
    this.initData()
    document.title = `${this.$t('basic.title')}`
  },
  methods: {
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
  grid-gap: 10px;
}
</style>
