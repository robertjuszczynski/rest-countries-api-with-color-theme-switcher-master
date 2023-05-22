<template>
  <CountryDetails v-if="country" :country="country" :key="country.cca3" />
  <div v-else>
    <br />
    <h1 class="text-lg">Oops... No country found :/</h1>
    <router-link to="/countries">Go home?</router-link>
  </div>
</template>

<script>
import CountryDetails from '../components/details/CountryDetails.vue'
import { useCountriesStore } from '../stores/useCountriesStore'

export default {
  data() {
    return {
      country: undefined
    }
  },
  components: {
    CountryDetails
  },
  methods: {
    getCountryMethod(id) {
      this.country = useCountriesStore().countries.find((country) => country.cca3 === id)
    }
  },
  watch: {
    $route(newRoute) {
      this.getCountryMethod(newRoute.params.id)
    }
  },
  created() {
    this.getCountryMethod(this.$route.params.id)
  }
}
</script>
