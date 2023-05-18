<template>
  <section
    class="dark:bg-darkBlue cursor-pointer"
    @click="
      () => {
        console.log(country)
      }
    "
  >
    <div
      class="bg-cover bg-center h-[47.5%]"
      :style="{ 'background-image': 'url(' + country.flags.png + ')' }"
    ></div>
    <div class="h-[52.5%] px-6 leading-[1.7] dark:text-whiteTextEl">
      <h2>{{ country.name.common }}</h2>
      <p><span>Population: </span>{{ country.population.toLocaleString('en-US') }}</p>
      <p><span>Region: </span>{{ country.region }}</p>
      <p><span>Capital: </span>{{ country.capital }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['country']
}
</script>

<style scoped>
span {
  font-weight: 600;
}
h2 {
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 1.25rem;
  margin-bottom: 1rem;
}
section {
  overflow: hidden;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  height: 20rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
section:hover,
section:focus {
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transform: scale(1.1);
}
</style>
