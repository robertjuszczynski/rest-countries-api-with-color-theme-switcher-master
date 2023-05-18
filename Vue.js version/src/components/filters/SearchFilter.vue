<template>
  <div
    class="mb-10 flex max-w-lg items-center rounded-md bg-whiteTextEl py-5 shadow-md dark:bg-darkBlue md:mb-0 md:w-512"
  >
    <label for="country-search">
      <i class="fa-solid fa-magnifying-glass fa-lg px-8"></i>
    </label>
    <input
      ref="input"
      id="country-search"
      type="search"
      placeholder="Search for a country..."
      class="w-full focus:outline-none dark:bg-darkBlue placeholder:dark:dark:text-whiteTextEl"
      @input="filterCountriesBySearch"
    />
  </div>
</template>

<script>
import { useCountriesStore } from '../../stores/useCountriesStore'

export default {
  data() {
    return {
      useCountriesStore: useCountriesStore()
    }
  },
  methods: {
    filterCountriesBySearch() {
      this.useCountriesStore.filterCountriesBySearch(this.$refs.input.value)
    }
  }
}
</script>

<style scoped>
i {
  color: #cacaca;
}
</style>
