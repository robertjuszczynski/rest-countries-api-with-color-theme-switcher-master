const CountriesWrapper = document.querySelector("#CountryWrapper");
const inputSearch = document.querySelector('input[type="search"]');
const getData = async () => {
  try {
    const AllData = await axios.get("https://restcountries.com/v3.1/all");
    displayCountries(AllData.data);
  } catch (error) {
    CountriesWrapper.textContent = "Can't get any Countries!";
    console.log(error);
  }
};
const searchCountries = async (name) => {
  try {
    const searchedCountries = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`
    );
    displayCountries(searchedCountries.data);
  } catch (error) {
    CountriesWrapper.textContent = "No countries found!";
    console.log(error);
  }
};
const displayCountries = (countries) => {
  CountriesWrapper.innerHTML = "";
  countries.forEach((country) => {
    const Country = `<div class="">
      <img src="${country.flags.png}" alt="${country.flags.alt}">
      <p>${country.name.official}</p>
      <p>${country.population}</p>
      <p>${country.region}</p>
      <p>${country.capital}</p>
    </div>`;
    CountriesWrapper.insertAdjacentHTML("beforeend", Country);
  });
};

let timeout;
inputSearch.addEventListener("input", () => {
  const inputValue = inputSearch.value;
  clearTimeout(timeout);
  if (inputValue !== "") {
    timeout = setTimeout(() => {
      searchCountries(inputValue);
    }, 200);
  } else {
    getData();
  }
});

getData();
