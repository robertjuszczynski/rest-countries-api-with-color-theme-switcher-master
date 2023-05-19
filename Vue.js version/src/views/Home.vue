<template>
  <main class="px-8 pb-12 sm:px-16">
    <Filters />
    <Countries />
  </main>
</template>

<script>
import Filters from '../components/filters/Filters.vue'
import Countries from '../components/countries/Countries.vue'

export default {
  components: {
    Filters,
    Countries
  },
}
</script>
