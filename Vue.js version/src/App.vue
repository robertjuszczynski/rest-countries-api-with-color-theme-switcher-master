<template>
  <TheHeader />
  <router-view ></router-view>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import { useCountriesStore } from './stores/useCountriesStore'
import { RouterView } from 'vue-router'

export default {
    data() {
        return {
            useCountriesStore: useCountriesStore()
        };
    },
    mounted() {
        this.useCountriesStore.fetchCountries();
        console.log("App mounted!");
    },
    components: { TheHeader }
}
</script>
