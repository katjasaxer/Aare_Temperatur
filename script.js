async function fetchAareData(city) {
    try {
        let url = `https://aareguru.existenz.ch/v2018/current?city=${city}`;
        let response = await fetch(url);
        let antwort = await response.json(); 
        return antwort;

    } catch (error) {
      console.error(`Fehler beim Abrufen der Aare-Daten für ${city}:`, error);
      return [];
    }
  }

let selectedCity = null;
let selectedType = null;

const buttonBernState = document.getElementById("buttonBern");
const buttonThunState = document.getElementById("buttonThun");
const buttonWaterTempState = document.getElementById("waterTemp");
const buttonAirTempState = document.getElementById("airTemp");

buttonThunState.addEventListener("click", () => selectCity("thun"));
buttonBernState.addEventListener("click", () => selectCity("bern"));
buttonWaterTempState.addEventListener("click", () => selectType("waterTemp"));
buttonAirTempState.addEventListener("click", () => selectType("airTemp"));

// Stadt auswählen
function selectCity(city) {
  selectedCity = city;
  checkAndFetch();
}

// Temperaturtyp auswählen
function selectType(type) {
  selectedType = type;
  checkAndFetch();
}

// Prüfen, ob beide ausgewählt, und dann Daten laden
async function checkAndFetch() {
  if (!selectedCity || !selectedType) return;

  const output = document.getElementById("output");
  output.innerText = "Lade...";

  const data = await fetchAareData(selectedCity);
  if (!data) {
    output.innerText = "Fehler beim Laden.";
    return;
  }

  let value;
  if (selectedType === 'waterTemp') {
    value = data.aare.temperature;
  } else if (selectedType === 'airTemp') {
    value = data.weather.current.tt;
  }

  output.innerHTML = value;
}

