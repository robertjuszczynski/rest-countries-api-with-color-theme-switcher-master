<template>
  <button
    id="region-filter-btn"
    class="relative flex max-w-fit items-center space-x-16 whitespace-nowrap rounded-md bg-whiteTextEl p-6 shadow-md dark:bg-darkBlue md:space-x-12"
    @click="toggleDropdown"
  >
    <span>{{ chosenRegion }}</span>
    <i
      class="fa-solid fa-chevron-down duration-300 ease-out"
      :class="{ 'rotate-180': isDropdownHidden }"
    ></i>
    <Transition name="fade">
      <ul
        class="absolute right-0 top-[110%] z-50 w-full space-y-2 rounded-md bg-whiteTextEl p-6 text-left shadow-md dark:bg-darkBlue"
        v-if="!isDropdownHidden"
      >
        <li v-for="region in regions" @click="filterCountriesByRegion(region)">
          {{ region }}
        </li>
      </ul>
    </Transition>
  </button>
</template>

<script>
import { useCountriesStore } from '../../stores/useCountriesStore'

export default {
  data() {
    return {
      chosenRegion: 'Filter by Region',
      useCountriesStore: useCountriesStore(),
      regions: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      isDropdownHidden: true
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownHidden = !this.isDropdownHidden
    },
    filterCountriesByRegion(region) {
      this.chosenRegion = region
      this.useCountriesStore.filterCountriesByRegion(region)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
