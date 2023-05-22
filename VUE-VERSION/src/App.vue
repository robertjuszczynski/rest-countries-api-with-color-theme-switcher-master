<template>
  <TheHeader />
  <main class="px-8 pb-12 sm:px-16">
    <router-view v-if="!fetching" />
  </main>
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
