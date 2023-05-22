<template>
    <Filters />
    <Countries />
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
