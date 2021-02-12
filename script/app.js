console.log("script loaded");

const continents = {
    africa: "Africa",
    omerica: "America",
    asia: "Asia",
    europe: "Europe",
    oceania: "Oceania",
  },
  endpoint = "https://restcountries.eu/rest/v2";

let countryHolder;

const renderCountries = (countries) =>{
    console.log({countries});
    let countriesHTML = ``;
    // !Object destructuring
    for (const {name, alpha2Code, flag, nativeName} of countries) {
        countriesHTML += `<section class="c-country">
          <input
            class="c-country__hidden-input o-hide-accessible"
            type="checkbox"
            name="country"
            id="${alpha2Code}"
          />
          <label class="c-country__label" for="${alpha2Code}">
            <div class="c-country__flag-holder"><img class="c-country__flag" src="${flag}" alt="The flag of ${name}." /></div>
            <div class="c-country__details">
              <h2 class="c-country__name">${name}</h2>
              <span class="c-country__native-name">${nativeName}</span>
            </div>
          </label>
        </section>`;
    }
    countryHolder.innerHTML = countriesHTML;
};

const getCountries = async (continent) => {
  const data = await get(`${endpoint}/region/${continent}`);
  console.log({ data });
  // !curly brackets zorgen dat als een object wordt weergegeven.
  renderCountries(data);
};

const getDomElements = () => {
  countryHolder = document.querySelector(".js-countries");
  getCountries(continents.europe);
};

document.addEventListener("DOMContentLoaded", () => {
  getDomElements();
});
