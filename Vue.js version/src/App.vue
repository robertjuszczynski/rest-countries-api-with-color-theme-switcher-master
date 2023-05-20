<template>
  <TheHeader />
  <router-view v-if="!fetching" />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import { useCountriesStore } from './stores/useCountriesStore'

export default {
  components: {
    TheHeader
  },
  computed: {
    fetching() {
      return useCountriesStore().fetching
    }
  },
  created() {
    useCountriesStore().fetchCountries()
  }
}
</script>
