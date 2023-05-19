<template>
  <main class="px-8 pb-12 sm:px-16">
    <CountryDetails :country="selectedCountry" />
  </main>
</template>

<script>
import CountryDetails from '../components/country-details/CountryDetails.vue'
import { useCountriesStore } from '../stores/useCountriesStore'

export default {
  data() {
    return {
      useCountriesStore: useCountriesStore()
    }
  },
  components: {
    CountryDetails
  },
  computed: {
    selectedCountry() {
      return this.useCountriesStore.countries.find(
        (country) => country.cca3 === this.$route.params.id
      )
    }
  },
}
</script>
