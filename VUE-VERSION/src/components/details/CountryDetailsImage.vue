<template>
  <img :src="src" :alt="alt" class="my-11 xl:my-0 w-full max-w-xl aspect-[16/11] xl:mr-32" />
</template>

<script>
export default {
  props: ['src', 'alt']
}
</script>
