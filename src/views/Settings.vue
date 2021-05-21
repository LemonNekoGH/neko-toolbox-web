<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col lg="6">
          <v-card outlined>
            <v-list>
              <!--language setting-->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('settings.language') }}</v-list-item-title>
                </v-list-item-content>
                  <v-menu>
                    <template #activator="{ attr, on }">
                      <v-btn class="text-no-uppercase" text v-on="on" v-bind="attr">
                        {{ $t('settings.' + $i18n.locale) }}
                        <v-icon right>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="setLanguage(lang)" v-for="(lang, index) in languages" :key="index">{{ $t('settings.' + lang) }}</v-list-item>
                    </v-list>
                  </v-menu>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import Vue from 'vue'
import { Storage } from '@/utils/util'

export default Vue.extend({
  data () {
    return {
      languages: ['zh', 'en']
    }
  },
  methods: {
    async setLanguage (lang: string) {
      try {
        this.$i18n.locale = lang
        await Storage.setItem('app-lang', lang)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style lang="less" src="../App.less"></style>
