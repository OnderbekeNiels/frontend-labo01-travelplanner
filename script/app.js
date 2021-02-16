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

const listenToSavedCountries = () => {
  const countries = document.querySelectorAll(".js-country-input");
  for (const country of countries) {
    country.addEventListener("change", function () {
      saveCountry(this.id, this.checked);
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
    if (add) {
      const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedData[selectedRegion]) {
        storedData[selectedRegion][alpha2code] = true; // key toevoegen aan bestaan object
      } else {
        storedData[selectedRegion] = { [alpha2code]: true }; // Nieuw object toekennen aan de nieuwe region
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
    } else {
      //remove
      // const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
    }
  }
  //Todo: wat als er nog een ander land toegevoegd wordt binnen het zelfde continent?
  //Todo: wat als we in een ander continent gaan selecteren
  //Todo: wat als we een land weer deselecteren
  // ! opslaan werkt nog niet goed
  // ! counter toevoegen.
  // ! kleuren dynamish maken
};

const searchLocalStorageFor = (alpha2code) => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const selectedRegion = document.querySelector(".js-continent-select").value;
  // if(!localData || !localData[selectedRegion]) return;
  if (localData[selectedRegion]) {
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
            "${searchLocalStorageFor(alpha2Code)}
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
};

document.addEventListener("DOMContentLoaded", () => {
  getDomElements();
});
