<template>
  <div class="flex flex-col gap-3 xl:flex-row xl:items-center whitespace-nowrap">
    <span class="text-xl xl:text-base">Border Countries:</span>
    <div class="flex flex-wrap gap-[10px]">
      <router-link
        v-if="hasBorders"
        class="dark:bg-darkBlue w-28 space-x-3 p-2 bg-whiteTextEl drop-shadow-md rounded-sm flex-1 text-center"
        v-for="border in borders"
        :to="'/countries/' + border.cca3"
        >{{ border.name }}</router-link
      >
      <p v-if="!hasBorders">No borders.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['borders'],
  computed: {
    hasBorders() {
      return this.borders.length > 0
    }
  }
}
</script>
