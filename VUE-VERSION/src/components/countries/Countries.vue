<template>
  <div id="country-wrapper" class="grid grid-cols-auto-fill justify-center gap-12 md:gap-20">
    <CountryItem v-for="(country, index) in filteredCountries" :key="index" :country="country" />
  </div>
</template>

<script>
import CountryItem from '../countries/CountryItem.vue'
import { useCountriesStore } from '../../stores/useCountriesStore'

export default {
  data() {
    return {
      useCountriesStore: useCountriesStore()
    }
  },
  computed: {
    filteredCountries() {
      return this.useCountriesStore.getFilteredCountries
    }
  },
  components: {
    CountryItem
  }
}
</script>
