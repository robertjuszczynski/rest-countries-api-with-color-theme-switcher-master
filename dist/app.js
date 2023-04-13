const countriesWrapper = document.querySelector("#country-wrapper");
const filtersContainer = document.querySelector("#filters-container");
const searchInput = document.querySelector("#country-search");
const regionFilterBtn = document.querySelector("#region-filter-btn");
const regionMenu = document.querySelector("[data-regions-menu]");
const regions = document.querySelectorAll("[data-region]");
const urlParams = new URLSearchParams(window.location.search);

let allCountriesData = [];

const getAllData = async () => {
  try {
    const allData = await axios.get("https://restcountries.com/v3.1/all");
    allCountriesData = allData.data;
    if (urlParams.has("country")) {
      showCountryDetails(urlParams.get("country"));
      return;
    }
    if (urlParams.has("reg")) {
      regionFilterBtn.children[0].innerText = urlParams.get("reg");
      searchCountriesByRegion(urlParams.get("reg"));
      return;
    }
    displayCountries(allCountriesData);
  } catch (error) {
    countriesWrapper.textContent = "Can't get any Countries!";
    console.log(error);
  }
};

const searchCountriesByName = (name) => {
  const searchedCountries = allCountriesData.filter((country) => country.name.official.toLowerCase().includes(name.toLowerCase()));
  searchedCountries.length === 0 ? (countriesWrapper.textContent = "No countries found!") : displayCountries(searchedCountries);
};

const searchCountriesByRegion = (region) => {
  const searchedCountries = allCountriesData.filter((country) => country.region.includes(region));
  searchedCountries.length === 0 ? (countriesWrapper.textContent = "No countries found!") : displayCountries(searchedCountries);
};

const displayCountries = (countries) => {
  countriesWrapper.innerHTML && (countriesWrapper.innerHTML = "");
  const fragment = document.createDocumentFragment();
  countries.forEach((country) => {
    const countryElement = document.createElement('section');
    countryElement.className = "h-80 bg-White-Dark-Mode-Text-&-Light-Mode-Elements overflow-hidden rounded-md shadow-md hover:scale-110 focus:scale-110 ease-out duration-300";
    countryElement.onclick = () => { window.location.search='country=' + country.cca3 };
    countryElement.innerHTML = `
      <div class="bg-cover bg-center bg-no-repeat h-[47.5%]" style="background-image: url('${
        country.flags.png
      }')"></div>
      <div class="h-[52.5%] px-6 leading-[1.7]">
        <h2 class="font-extrabold text-base mt-5 mb-4">${
          country.name.common
        }</h2>
        <p><span class="font-semibold">Population:</span> ${country.population.toLocaleString(
          "en-US"
        )}</p>
        <p><span class="font-semibold">Region:</span> ${country.region}</p>
        <p><span class="font-semibold">Capital:</span> ${country.capital}</p>
      </div>`;
    fragment.appendChild(countryElement);
  });
  countriesWrapper.appendChild(fragment);
};

const showCountryDetails = (countrycca3) => {
  const selectedCountry = allCountriesData.find((country) => country.cca3 === countrycca3);
  console.log(selectedCountry)
  
  const backButton = `
    <button class="my-10 w-28 space-x-3 p-2 bg-White-Dark-Mode-Text-&-Light-Mode-Elements drop-shadow-md rounded-sm" onclick="history.back()">
      <i class="fa-solid fa-arrow-left-long scale-125"></i>
      <span>Back</span>
    </button>
  `;
  
  const flagImage = `
    <img class="my-8 w-full max-w-2xl" src="${selectedCountry.flags.png}" alt="${selectedCountry.flags.alt}">
  `;
  
  const countryDetails = `
    <div class="space-y-3">
      <h1 class="font-extrabold text-[22px]">${selectedCountry.name.common}</h1>
      <div class="leading-8">
      <p><span class="font-semibold">Native Name: </span>${selectedCountry.name.nativeName[Object.keys(selectedCountry.name.nativeName)[0]].common}</p>
      <p><span class="font-semibold">Population: </span>${selectedCountry.population.toLocaleString("en-US")}</p>
      <p><span class="font-semibold">Region: </span>${selectedCountry.region}</p>
      <p><span class="font-semibold">Sub Region: </span>${selectedCountry.subregion}</p>
      <p><span class="font-semibold">Capital: </span>${selectedCountry.capital}</p>
      </div>
      <div class="leading-8">
      <p><span class="font-semibold">Top Level Domain: </span>${selectedCountry.tld}</p>
      <p><span class="font-semibold">Currencies: </span>${Object.values(selectedCountry.currencies).map(currency => currency.name).join(", ")}</p>
      <p><span class="font-semibold">Languages: </span>${Object.values(selectedCountry.languages).map(language => language).join(", ")}</p></div>
    </div>
  </div>`;


  const borderCountriesButtons = () => {
    const borderCountries = selectedCountry.borders;
    const borderCountriesButtons = []
    if (typeof borderCountries !== 'undefined') {
      for (let border of borderCountries) {
        borderCountriesButtons.push(`
        <button class="w-28 space-x-3 p-2 bg-White-Dark-Mode-Text-&-Light-Mode-Elements drop-shadow-md rounded-sm" onclick="window.location.search='country=${border}'">
          <span>${allCountriesData.find((country) => country.cca3 == border).name.common}</span>
        </button>
        `)
      }
      return borderCountriesButtons.join('')
    } else {
      return `No Border Countries found!`
    }
  }
  
  const countryElement = `
    <div>
      ${backButton}
      <div class="max-w-5xl">
        ${flagImage}
        ${countryDetails}
      <div class="flex flex-col">
        <span class="font-semibold text-xl">Border Countries:</span>
        <div class="flex flex-wrap gap-[10px]">
          ${borderCountriesButtons()}
        </div>
      </div>
      </div>
    </div>
  `;
  
  filtersContainer.classList.toggle("hidden");
  countriesWrapper.classList.toggle("hidden");
  document.querySelector("main").insertAdjacentHTML("beforeend", countryElement);
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

regions.forEach(region => {
  region.addEventListener("click", () => {
    const selectedRegion = region.innerText;
    if (regionFilterBtn.children[0].innerText !== selectedRegion) {
      regionFilterBtn.children[0].innerText = selectedRegion;
      window.location.search = `reg=${selectedRegion}`;
    }
  });
});

getAllData();
