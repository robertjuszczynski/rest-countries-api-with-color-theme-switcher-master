const countriesWrapper = document.querySelector("#country-wrapper");
const filtersContainer = document.querySelector("#filters-container")
const searchInput = document.querySelector('#country-search');
const regionFilterBtn = document.querySelector("#region-filter-btn");
const regionMenu = regionFilterBtn.querySelector("ul");
const regions = regionMenu.querySelectorAll("li");
const urlParams = new URLSearchParams(window.location.search);

let allCountriesData = [];

const getAllData = async () => {
  try {
    const allData = await axios.get("https://restcountries.com/v3.1/all");
    allCountriesData = allData.data;
    console.log(allCountriesData)
    displayCountries(allCountriesData);
    if (urlParams.has("reg")) {
      regionFilterBtn.children[0].innerText = urlParams.get("reg");
      searchCountriesByRegion(urlParams.get("reg"))
      return
    }
  } catch (error) {
    countriesWrapper.textContent = "Can't get any Countries!";
    console.log(error);
  }
};

const searchCountriesByName = (name) => {
  const searchedCountries = allCountriesData.filter((country) =>
    country.name.official.toLowerCase().includes(name.toLowerCase())
  );
  searchedCountries.length === 0 ? countriesWrapper.textContent = "No countries found!" : displayCountries(searchedCountries);
};

const searchCountriesByRegion = (region) => {
  const searchedCountries = allCountriesData.filter((country) =>
    country.region.toLowerCase().includes(region.toLowerCase())
  );
  console.log(searchedCountries)
  searchedCountries.length === 0 ? countriesWrapper.textContent = "No countries found!" : displayCountries(searchedCountries);
};

const displayCountries = (countries) => {
  countriesWrapper.innerHTML && (countriesWrapper.innerHTML = "");
  countries.forEach((country) => {
    const countryElement = `<div class="country-container h-80 bg-White-Dark-Mode-Text-&-Light-Mode-Elements overflow-hidden rounded-md shadow-md hover:scale-110 focus:scale-110 ease-out duration-300">
      <div class="bg-cover bg-center bg-no-repeat h-[47.5%]" style="background-image: url('${
        country.flags.png
      }')"></div>
      <div class="h-[52.5%] px-6 leading-[1.7]">
        <p class="font-extrabold text-base mt-5 mb-4">${
          country.name.official
        }</p>
        <p><span class="font-semibold">Population:</span> ${country.population.toLocaleString(
          "en-US"
        )}</p>
        <p><span class="font-semibold">Region:</span> ${country.region}</p>
        <p><span class="font-semibold">Capital:</span> ${country.capital}</p>
      </div>
    </div>`;
    countriesWrapper.insertAdjacentHTML("beforeend", countryElement);
  })
};

const showCountryDetails = (country) => {
  console.log(country)
  filtersContainer.classList.toggle('hidden')
  countriesWrapper.classList.toggle('hidden')
};

searchInput.addEventListener("input", () => {
  const inputValue = searchInput.value;
  inputValue !== "" ? searchCountriesByName(inputValue) : displayCountries(allCountriesData);
});

regionFilterBtn.addEventListener("click", () => {
  regionFilterBtn.children[1].classList.toggle("rotate-180");
  regionMenu.classList.toggle("hidden");
  regionMenu.classList.toggle("animate-fade");
});

regions.forEach((region) => {
  region.addEventListener("click", () => {
    let selectedRegion = region.innerText;
    if (regionFilterBtn.children[0].innerText !== selectedRegion) {
      regionFilterBtn.children[0].innerText = selectedRegion;
      urlParams.set("reg", selectedRegion);
      window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
      searchCountriesByRegion(selectedRegion);
    }
  });
});

getAllData();