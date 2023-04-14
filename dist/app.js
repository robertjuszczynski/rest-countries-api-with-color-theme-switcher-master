const countriesWrapper = document.getElementById("country-wrapper");
const themeChanger = document.querySelector("[data-theme-changer]");
const filtersContainer = document.querySelector("nav");
const searchInput = document.getElementById("country-search");
const regionFilterBtn = document.getElementById("region-filter-btn");
const regionMenu = document.querySelector("ul");
const regions = document.querySelectorAll("li");
const urlParams = new URLSearchParams(window.location.search);

let allCountriesData = [];

// Fetches country data from a REST API and displays it in the DOM based on URL query parameters, with error handling for failed API requests.
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

//Filters all countries in the allCountriesData array based on whether their official name contains the name (case-insensitive)
const searchCountriesByName = (name) => {
  const searchedCountries = allCountriesData.filter((country) => country.name.official.toLowerCase().includes(name.toLowerCase()));
  searchedCountries.length === 0 ? (countriesWrapper.textContent = "No countries found!") : displayCountries(searchedCountries);
};
//Takes a region parameter, filters all countries in the allCountriesData array based on whether their region property matches the region parameter.
const searchCountriesByRegion = (region) => {
  const searchedCountries = allCountriesData.filter((country) => country.region.includes(region));
  searchedCountries.length === 0 ? (countriesWrapper.textContent = "No countries found!") : displayCountries(searchedCountries);
};

/* 
Takes a countrycca3 parameter, retrieves data for the selected country from allCountriesData based on its cca3 property,
generates buttons for border countries based on the borders property of the selected country,
using the borderCountriesButtons function.
*/

const displayCountries = (countries) => {
  countriesWrapper.innerHTML && (countriesWrapper.innerHTML = "");
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < countries.length; i++) {
    const {cca3, name: {common}, flags, population, region, capital} = countries[i];
    const countryElement = document.createElement('section');
    countryElement.classList = 'dark:bg-darkBlue cursor-pointer';
    countryElement.addEventListener("click", () => window.location.search = 'country=' + cca3);
    countryElement.innerHTML = `
      <div class="bg-cover bg-center h-[47.5%]" style="background-image: url('${flags.png}')"></div>
      <div class="h-[52.5%] px-6 leading-[1.7] dark:text-whiteTextEl">
        <h2>${common}</h2>
        <p><span >Population:</span> ${population.toLocaleString("en-US")}</p>
        <p><span >Region:</span> ${region}</p>
        <p><span >Capital:</span> ${capital}</p>
      </div>`;
    fragment.appendChild(countryElement);
  }
  countriesWrapper.appendChild(fragment);
};

/*
Displays detailed information about the selected country.
The information is extracted from the allCountriesData array.
The function also toggles the visibility of the filter and country wrapper elements, and inserts the generated HTML code into the main section of the document. 
*/
const showCountryDetails = (countrycca3) => {
  const selectedCountry = allCountriesData.find(({cca3}) => cca3 === countrycca3);
  const {flags: {png, alt}, name: {common, nativeName}, population, region, subregion, capital, tld, currencies, languages} = selectedCountry;

  const borderCountriesButtons = () => {
    const { borders } = selectedCountry;
    if (!borders) {
      return 'No borders found!';
    }
    const buttons = borders.map((border) => {
      const { name: { common } } = allCountriesData.find(({ cca3 }) => cca3 === border);
      return `
        <button class="dark:bg-darkBlue w-28 space-x-3 p-2 bg-whiteTextEl drop-shadow-md rounded-sm flex-1" onclick="window.location.search='country=${border}'">
          <p>${common}</p>
        </button>
      `;
    });
    return buttons.join('');
  };
  


  const backButton = `
    <button class="dark:bg-darkBlue my-8 xl:my-16 w-28 space-x-3 p-2 bg-whiteTextEl drop-shadow-md rounded-sm" onclick="history.back()">
      <i class="fa-solid fa-arrow-left-long scale-125"></i>
      <span>Back</span>
    </button>`

  const flagImage = `<img class="my-11 xl:my-0 w-full max-w-xl aspect-[16/11] xl:mr-32" src="${png}" alt="${alt}">`;

  const countryDetails = `
    <h1 class="text-[22px]">${common}</h1>
    <div class="xl:flex xl:justify-between xl:mt-8 xl:mb-10 xl:space-x-16 leading-8">
      <div class="my-6 xl:my-0">
      <p><span>Native Name: </span>${nativeName[Object.keys(nativeName)[0]].common}</p>
      <p><span>Population: </span>${population.toLocaleString("en-US")}</p>
      <p><span>Region: </span>${region}</p>
      <p><span>Sub Region: </span>${subregion}</p>
      <p><span>Capital: </span>${capital}</p>
      </div>
      <div class="my-8 xl:my-0">
      <p><span>Top Level Domain: </span>${tld}</p>
      <p><span>Currencies: </span>${Object.values(currencies).map(({name}) => name).join(", ")}</p>
      <p><span>Languages: </span>${Object.values(languages).join(", ")}</p></div>
      </div>
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center whitespace-nowrap">
        <span class=" text-xl xl:text-base">Border Countries:</span>
        <div class="flex flex-wrap gap-[10px]">
          ${borderCountriesButtons()}
        </div>
      </div>
    </div>`
  
  const countryElement = `
  ${backButton}
    <div class="sm:flex sm:flex-col sm:items-center xl:flex-row justify-around">
      ${flagImage}
      <div class="sm:flex sm:flex-col sm:text-center sm:items-center xl:text-left xl:flex xl:flex-col xl:items-stretch xl:min-w-[400px]">
        ${countryDetails}
      </div>
    </div>`
  
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

themeChanger.addEventListener("click", () => {
  const theme = html.classList.contains('dark') ? "light" : "dark";
  html.classList.toggle('dark');
  localStorage.setItem("theme", theme);
  themeChanger.children[0].classList.toggle('rotate-180');
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
