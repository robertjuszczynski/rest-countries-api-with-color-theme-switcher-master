<template>
  <nav class="my-8 flex flex-col md:my-12 md:flex-row md:justify-between">
    <SearchFilter />
    <RegionFilter />
  </nav>
</template>

<script>
import RegionFilter from './RegionFilter.vue'
import SearchFilter from './SearchFilter.vue'

export default {
  components: {
    RegionFilter,
    SearchFilter
  }
}
</script>
