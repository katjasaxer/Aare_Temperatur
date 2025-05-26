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

document.addEventListener("DOMContentLoaded", function() {
  checkAndFetch();
  selectBernTemp();
  selectAirTemp();
});
  
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

const airTempImg = document.getElementById("airTempImg");
const waterTempImg = document.getElementById("waterTempImg");
const buttonBernImg = document.getElementById("buttonBernImg");
const buttonThunImg = document.getElementById("buttonThunImg");

buttonWaterTempState.addEventListener("click", selectWaterTemp);
buttonAirTempState.addEventListener("click", selectAirTemp);
buttonThunState.addEventListener("click", selectThunTemp);
buttonBernState.addEventListener("click", selectBernTemp);


//when location gets clicked
function selectBernTemp() {
  buttonBernImg.src="images/Bern_icon_ausgewaehlt.png";
  buttonThunImg.src="images/Thun_icon.png";
}
  
function selectThunTemp() {
    buttonBernImg.src="images/Bern_icon.png";
    buttonThunImg.src="images/Thun_icon_ausgewaehlt.png";
}

//when airTemp gets clicked
function selectAirTemp() {
airTempImg.src="images/Luft_icon_ausgewaehlt.png";
waterTempImg.src="images/Wasser_icon_hell.png";
}

function selectWaterTemp() {
  airTempImg.src="images/Luft_icon_hell.png";
  waterTempImg.src="images/Wasser_icon_ausgewaehlt.png";
}

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
  if (!selectedCity || !selectedType) {
    selectedCity = "bern"
    selectedType = "airTemp";
  }
  const output = document.getElementById("output");

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

  output.innerHTML = value + "°C";
  setTemperature(value);
  setCurrentTime();
}

//Thermometer ab hier

const temperature = document.getElementById("temperature");

function setTemperature(temp) {
	temperature.style.height = (temp - -10) / (40 - -10) * 100 + "%";
}


function setCurrentTime(){
var currentdate = new Date(); 
var datetime =  "Letztes Update: " +
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() 
document.getElementById("dateAndtime").innerHTML = datetime;
}