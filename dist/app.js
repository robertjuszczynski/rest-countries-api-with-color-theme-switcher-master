const countriesWrapper = document.querySelector("#country-wrapper");
const filtersContainer = document.querySelector("#filters-container")
const searchInput = document.querySelector('#country-search');
const regionFilterBtn = document.querySelector("#region-filter-btn");
const regionMenu = regionFilterBtn.querySelector("ul");
const Regions = regionMenu.querySelectorAll("li");
const urlParams = new URLSearchParams(window.location.search);

const getAllData = async () => {
  try {
    const allData = await axios.get("https://restcountries.com/v3.1/all");
    if (urlParams.has("reg")) {
      regionFilterBtn.children[0].innerText = urlParams.get("reg");
      searchCountriesByRegion(urlParams.get("reg"))
      return
    }
    displayCountries(allData.data);
  } catch (error) {
    countriesWrapper.textContent = "Can't get any Countries!";
    console.log(error);
  }
};

const searchCountriesByName = async (name) => {
  try {
    const searchedCountries = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`
    );
    displayCountries(searchedCountries.data);
  } catch (error) {
    countriesWrapper.textContent = "No countries found!";
    console.log(error);
  }
};
const searchCountriesByRegion = async (region) => {
  try {
    const searchedCountries = await axios.get(
      `https://restcountries.com/v3.1/region/${region}`
    );
    displayCountries(searchedCountries.data);
  } catch (error) {
    countriesWrapper.textContent = "No countries found!";
    console.log(error);
  }
};
const displayCountries = (countries) => {
  countriesWrapper.innerHTML = "";
  countries.forEach((country) => {
    const countryElement = `<div class="country-container h-80 bg-White-Dark-Mode-Text-&-Light-Mode-Elements overflow-hidden rounded-md shadow-md hover:scale-110 focus:scale-110 ease-out duration-300">
      <div class="bg-cover bg-center bg-no-repeat h-[47.5%]" style="background-image: url('${
        country.flags.png
      }')"></div>
      <div class="h-[52.5%] px-6 leading-[1.7]">
        <p data-country-name="${country.name.official}" class="font-extrabold text-base mt-5 mb-4">${
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
  });
};

const viewCountryDetails = (country) => {

};

let timeoutId;
searchInput.addEventListener("input", () => {
  const inputValue = searchInput.value;
  clearTimeout(timeoutId);
  if (inputValue !== "") {
    timeoutId = setTimeout(() => {
      searchCountriesByName(inputValue);
    }, 200);
  } else {
    getAllData();
  }
});

regionFilterBtn.addEventListener("click", () => {
  regionFilterBtn.children[1].classList.toggle("rotate-180");
  regionMenu.classList.toggle("hidden");
  regionMenu.classList.toggle("animate-fade");
});

Regions.forEach((Region) => {
  Region.addEventListener("click", () => {
    if (!(regionFilterBtn.children[0].innerText == Region.innerText)) {
      regionFilterBtn.children[0].innerText = Region.innerText;
      urlParams.set("reg", `${Region.innerText}`)
      window.location.search = urlParams;
      return
    }
  });
});
getAllData();