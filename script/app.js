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

const getCountries = async (continent) => {
  const data = await get(`${endpoint}/region/${continent}`);
  console.log({ data });
  // !curly brackets zorgen dat als een object wordt weergegeven.
};

const getDomElements = () => {
  countryHolder = document.querySelector(".js-countries");
  getCountries(continents.europe);
};

document.addEventListener("DOMContentLoaded", () => {
  getDomElements();
});
