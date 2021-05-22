<template>
  <v-main>
    <v-container>
      <v-card outlined>
        <v-app-bar flat color="white">
          <v-app-bar-nav-icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-app-bar-nav-icon>
          <v-app-bar-title>{{ $t('httpClient.title') }}</v-app-bar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>
