<template>
  <header
    class="flex items-center justify-between overflow-hidden bg-whiteTextEl px-6 py-9 shadow-md dark:bg-darkBlue sm:px-16 sm:py-6"
  >
    <a href="index.html" class="text-lg font-bold sm:text-2xl">Where in the world?</a>
    <button class="relative items-center" @click="toggleDark()">
      <div class="absolute -left-8 top-[10px] flex flex-col space-y-16 duration-500 ease-out">
        <i class="hidden fa-regular fa-moon fa-lg"></i>
        <i class="fa-regular fa-sun fa-lg"></i>
      </div>
      <span>Dark Mode</span>
    </button>
  </header>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
