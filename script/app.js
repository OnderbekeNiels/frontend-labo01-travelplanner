// Todo: colorslider
// Todo: idk anymore

console.log("script loaded");

const continents = {
    africa: "Africa",
    omerica: "America",
    asia: "Asia",
    europe: "Europe",
    oceania: "Oceania",
  },
  endpoint = "https://restcountries.eu/rest/v2",
  LOCAL_STORAGE_KEY = "countries";

let countryHolder, filter;

const showMessage = (countryElement, added) => {
  console.log({ countryElement });
  // ! we gaan hier relatief snel over omdat we final zullen werken met react
  const curruntCountry = countryElement.parentNode.querySelector(
    ".c-country__name"
  ).innerText;
  let message = added
    ? `You have added ${curruntCountry} to the list of places you would like to visit.`
    : `You are not long interested in this ${curruntCountry}.`;

  showNotification(message, null);
};

const listenToSavedCountries = () => {
  const countries = document.querySelectorAll(".js-country-input");
  for (const country of countries) {
    country.addEventListener("change", function () {
      saveCountry(this.id, this.checked);
      showMessage(this, this.checked);
    });
  }
};

const saveCountry = (alpha2code, add) => {
  // ! Hier een key gebruiken maakt het dynamisch
  const savedCountries = localStorage.getItem(LOCAL_STORAGE_KEY);
  const selectedRegion = document.querySelector(".js-continent-select").value;
  //Eerste gebruik van de app
  if (!savedCountries && add) {
    const initialData = {
      [selectedRegion]: {
        [alpha2code]: true,
      },
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return;
  } else {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (add) {
      if (storedData[selectedRegion]) {
        storedData[selectedRegion][alpha2code] = true; // key toevoegen aan bestaan object
      } else {
        storedData[selectedRegion] = { [alpha2code]: true }; // Nieuw object toekennen aan de nieuwe region
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
    } else {
      //remove
      delete storedData[selectedRegion][alpha2code];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
    }
  }
  // ! counter toevoegen.
  updateCounter(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
};

const updateCounter = (continents) => {
  const counter = document.querySelector(".js-countries-visited");
  let count = 0;
  if (continents) {
    for (const region in continents) {
      console.log(region);
      count += Object.keys(continents[region]).length;
    }
  }
  counter.innerText = count;
};

const searchLocalStorageFor = (alpha2code) => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const selectedRegion = document.querySelector(".js-continent-select").value;
  if (!localData || !localData[selectedRegion]) return;
  if (localData[selectedRegion][alpha2code]) {
    return "checked";
  } else {
    delete localData[selectedRegion][alpha2code];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
    return;
  }
};

const renderCountries = (countries) => {
  console.log({ countries });
  let countriesHTML = ``;
  // !Object destructuring
  for (const { name, alpha2Code, flag, nativeName } of countries) {
    countriesHTML += `<section class="c-country">
          <input
            class="c-country__hidden-input o-hide-accessible js-country-input"
            type="checkbox"
            name="country"
            ${searchLocalStorageFor(alpha2Code)}
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
  listenToSavedCountries();
};

const getCountries = async (continent) => {
  const data = await get(`${endpoint}/region/${continent}`);
  console.log({ data });
  // !curly brackets zorgen dat als een object wordt weergegeven.
  renderCountries(data);
};

const listenToFilter = () => {
  filter.addEventListener("change", (e) => {
    getCountries(e.target.value);
  });
};

const getDomElements = () => {
  countryHolder = document.querySelector(".js-countries");
  filter = document.querySelector(".js-continent-select");
  getCountries(filter.value);

  listenToFilter();
  updateCounter(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
};

const listenToClickSettings = () =>{
let isOpen = false;
document.querySelector(".js-settings-button").addEventListener("click", () => {
  if (isOpen) {
    document
      .querySelector(".c-settings")
      .classList.remove("c-settings--accessible");
    isOpen = false;
  } else {
    document
      .querySelector(".c-settings")
      .classList.add("c-settings--accessible");
    isOpen = true;
  }
});
}

document.addEventListener("DOMContentLoaded", () => {
  getDomElements();
  listenToClickSettings();
});
