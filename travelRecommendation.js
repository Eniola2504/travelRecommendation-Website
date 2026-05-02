"use strict";
let travelData;
let resultData;
const resultsContainer = document.getElementsByClassName("hero-content");
let heroContent;
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

// ----------- fetch Data -----------------------

async function fetchData() {
  try {
    const response = await fetch("travelRecommendation.json");
    const data = await response.json();
    travelData = data;
    // console.log("Data loaded successfully:", travelData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// -------------------handle search---------------------------
/**
 *@param {string} input - The search term from the user.
 * @param {Object} travelData - The data object containing countries, temples, and beaches.
 */
function handleSearch(input) {
  if (!input || !travelData) return;

  const searchTerm = input.toLowerCase().trim();

  // 1. Check Countries and Cities
  if (travelData.countries) {
    for (const country of travelData.countries) {
      // Check if property name (country name) equals search input
      if (country.name.toLowerCase().includes(searchTerm)) {
        resultData = country;
        console.log(resultData);
        displayCategoryResult(country);
        return;
      }

      // 2. Check nested array of objects (cities) within the country
      if (country.cities) {
        const matchedCity = country.cities.find(city =>
          city.name.toLowerCase().includes(searchTerm),
        );

        if (matchedCity) {
          resultData = matchedCity;
          console.log(resultData);
          displayResult(matchedCity);
          return;
        }
      }
    }
  }

  // 3. Check Temples
  if (travelData.temples) {
    const matchedTemple = travelData.temples.find(temple =>
      temple.name.toLowerCase().includes(searchTerm),
    );

    if (matchedTemple) {
      resultData = matchedTemple;
      console.log(resultData);
      displayResult(matchedTemple);
      return;
    }
  }

  // 4. Check Beaches
  if (travelData.beaches) {
    const matchedBeach = travelData.beaches.find(beach =>
      beach.name.toLowerCase().includes(searchTerm),
    );

    if (matchedBeach) {
      resultData = matchedBeach;
      console.log(resultData);
      displayResult(matchedBeach);
      return;
    }
  }

  console.log("No results found for:", input);
}

// -------------------initialize the data fetched and add event listeners---------------------------

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  searchBtn.addEventListener("click", handleSearch);
});
