import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('country', {
  state: () => {
    return {
      countries: [],
      filteredCountries: [],
      fetching: true
    }
  },
  getters: {
    getFilteredCountries(state) {
      return state.filteredCountries
    }
  },
  actions: {
    fetchCountries() {
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Http error: ${res.status}`)
          }
        })
        .then((res) => {
          this.countries = res
          this.filteredCountries = res
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.fetching = false
        })
    },
    filterCountriesByRegion(region) {
      this.filteredCountries = this.countries.filter((country) => country.region.includes(region))
    },
    filterCountriesBySearch(input) {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.official.toLowerCase().includes(input.toLowerCase())
      )
    }
  }
})
