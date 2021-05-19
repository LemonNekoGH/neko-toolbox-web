<template>
  <div>
    <Header :title="$t('settings.title')" :in-options="inOptions"></Header>
    <v-main>Settings</v-main>
  </div>
</template>
<script>
import Header from '../components/Header'
export default {
  components: {
    Header
  },
  props: {
    inOptions: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
