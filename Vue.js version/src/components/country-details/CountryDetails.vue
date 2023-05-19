<template>
  <CountryDetailsBackButton />
  <div class="sm:flex sm:flex-col sm:items-center xl:flex-row justify-around">
    <CountryDetailsImage :src="src" :alt="alt" />
    <div
      class="sm:flex sm:flex-col sm:text-center sm:items-center xl:text-left xl:flex xl:flex-col xl:items-stretch xl:min-w-[400px]"
    >
      <h1 class="text-[22px]" @click="cipa">{{ name }}</h1>
      <div class="xl:flex xl:justify-between xl:mt-8 xl:mb-10 xl:space-x-16 leading-8">
        <div class="my-6 xl:my-0">
          <p><span>Native Name: </span>{{ name }}</p>
          <p><span>Population: </span>{{ population }}</p>
          <p><span>Region: </span>{{ region }}</p>
          <p><span>Sub Region: </span>{{ subregion }}</p>
          <p><span>Capital: </span>{{ capital }}</p>
        </div>
        <div class="my-8 xl:my-0">
          <p><span>Top Level Domain: </span>{{ topLevelDomain }}</p>
          <p><span>Currencies: </span>{{ currencies }}</p>
          <p><span>Languages: </span>{{ languages }}</p>
        </div>
      </div>
      <CountryDetailsBorders :borders="borders" />
    </div>
  </div>
</template>

<script>
import CountryDetailsBackButton from './CountryDetailsBackButton.vue'
import CountryDetailsBorders from './CountryDetailsBorders.vue'
import CountryDetailsImage from './CountryDetailsImage.vue'
export default {
  props: ['country'],
  data() {
    return {
      name: this.country.name.common,
      src: this.country.flags.png,
      alt: this.country.flags.alt,
      population: this.country.population.toLocaleString('en-US'),
      region: this.country.region,
      subregion: this.country.subregion,
      capital: this.country.capital.join(', '),
      topLevelDomain: this.country.tld.join(),
      currencies: Object.values(this.country.currencies)
        .map((currency) => currency.name)
        .join(', '),
      languages: Object.values(this.country.languages).join(', '),
      borders: this.country.borders
    }
  },
  components: {
    CountryDetailsImage,
    CountryDetailsBorders,
    CountryDetailsBackButton
  },
  methods: {
    cipa() {
      console.log(this.country)
    }
  }
}
</script>
