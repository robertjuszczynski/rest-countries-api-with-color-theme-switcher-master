<template>
  <TheHeader />
  <main class="px-8 pb-12 sm:px-16">
    <Filters />
    <Countries />
  </main>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import Filters from './components/filters/Filters.vue'
import Countries from './components/countries/Countries.vue'
import { useCountriesStore } from './stores/useCountriesStore'

export default {
  data() {
    return {
      useCountriesStore: useCountriesStore()
    }
  },
  components: {
    TheHeader,
    Filters,
    Countries
  },
  created() {
    this.useCountriesStore.fetchCountries()
  }
}
</script>
