<template>
  <button
    class="dark:bg-darkBlue my-8 xl:my-16 w-28 space-x-3 p-2 bg-whiteTextEl drop-shadow-md rounded-sm"
    @click="goBack"
  >
    <i class="fa-solid fa-arrow-left-long scale-125"></i>
    <span>Back</span>
  </button>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>
