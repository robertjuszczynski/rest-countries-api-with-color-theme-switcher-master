<template>
  <CountryDetailsBackButton />
  <div class="sm:flex sm:flex-col sm:items-center xl:flex-row justify-around">
    <CountryDetailsImage :src="src" :alt="alt" />
    <div
      class="sm:flex sm:flex-col sm:text-center sm:items-center xl:text-left xl:flex xl:flex-col xl:items-stretch xl:min-w-[400px]"
    >
      <h1 class="text-[22px]">{{ name }}</h1>
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
      <CountryDetailsBorders :borders="formattedBorders" />
    </div>
  </div>
</template>

<script>
import { useCountriesStore } from '../../stores/useCountriesStore'
import CountryDetailsBackButton from './CountryDetailsBackButton.vue'
import CountryDetailsBorders from './CountryDetailsBorders.vue'
import CountryDetailsImage from './CountryDetailsImage.vue'

export default {
  props: ['country'],
  computed: {
    name() {
      return this.country.name.common
    },
    src() {
      return this.country.flags.png
    },
    alt() {
      return this.country.flags.alt
    },
    population() {
      return this.country.population.toLocaleString('en-US')
    },
    region() {
      return this.country.region
    },
    subregion() {
      return this.country.subregion
    },
    capital() {
      return this.country.capital.join(', ')
    },
    topLevelDomain() {
      return this.country.tld.join()
    },
    currencies() {
      return Object.values(this.country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    },
    languages() {
      return Object.values(this.country.languages).join(', ')
    },
    formattedBorders() {
      const countries = useCountriesStore().countries
      if (this.country.borders !== undefined) {
        return this.country.borders.map((border) => {
          const country = countries.find((c) => c.cca3 === border)
          return { name: country.name.common, cca3: country.cca3 }
        })
      } else {
        return []
      }
    }
  },
  components: {
    CountryDetailsImage,
    CountryDetailsBorders,
    CountryDetailsBackButton
  }
}
</script>
