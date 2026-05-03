"use strict";
let travelData;
let resultData;
const heroContainer = document.querySelector(".hero-content");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const resultContainer = document.getElementById("searchResults");

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

function handleSearch() {
  // make sure result container is empty & add display none to the hero-content and also add display inline-flex to the resultContainer
  resultContainer.innerHTML = "";
  if (heroContainer) heroContainer.style.display = "none";
  if (resultContainer) resultContainer.style.display = "inline-flex";

  const input = searchInput.value;
  if (!input) return;

  const searchTerm = input.toLowerCase().trim();
  const { countries, temples, beaches } = travelData;

  // check if search term is either country || temple || beach
  if (searchTerm.includes("countr")) {
    countries.forEach(country => {
      displayCategoryResult(country);
    });
    return;
  } else if (searchTerm.includes("temple")) {
    temples.forEach(temple => {
      displayCategoryResult(temple);
    });
    return;
  } else if (searchTerm.includes("beach")) {
    beaches.forEach(beach => {
      displayCategoryResult(beach);
    });
    return;
  }

  // 1. Check Countries and Cities
  if (travelData.countries) {
    for (const country of travelData.countries) {
      // Check if property name (country name) equals search input
      if (country.name.toLowerCase().includes(searchTerm)) {
        resultData = country;
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
      displayResult(matchedBeach);
      return;
    }
  }

  console.log("No results found for:", input);
}

function displayCategoryResult(category) {
  const categoryCard = document.createElement("div");
  categoryCard.className = "card";

  // Fix: safe backgroundImage with quotes & fallback
  const imgUrl =
    category.cities?.[0].imageUrl ||
    category.imageUrl ||
    "images/placeholder.jpg";
  categoryCard.style.backgroundImage = `url("${encodeURI(imgUrl)}")`;
  categoryCard.style.backdropFilter = "blur(5px)";

  // heading
  const heading = document.createElement("p");
  heading.className = "heading";
  heading.textContent = category.name;
  categoryCard.appendChild(heading);

  // button with accessibility
  const btn = document.createElement("button");
  btn.className = "cssbuttons-io-button";
  btn.innerHTML = `Explore more
                  <div class="icon">
                    <svg
                      height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden = "true">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                    </svg>
                  </div>`;
  categoryCard.appendChild(btn);
  resultContainer.appendChild(categoryCard);
}

// -------------------initialize the data fetched and add event listeners---------------------------

document.addEventListener("DOMContentLoaded", () => {
  searchBtn.disabled = true;
  fetchData().then(() => {
    searchBtn.disabled = false;
  });
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") handleSearch();
  });
  resetBtn?.addEventListener("click", () => {
    searchInput.value = "";
    if (resultContainer) resultContainer.style.display = "none";
    if (heroContainer) heroContainer.style.display = "block";
  });
});
