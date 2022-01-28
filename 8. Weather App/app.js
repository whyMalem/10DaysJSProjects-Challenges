const form = document.getElementById("form");
const btn = document.querySelector(".btn");
const search = document.querySelector(".search");
const output = document.querySelector(".output");
const temp = document.querySelector(".temp");
const tempStatus = document.querySelector(".temp-status");
const humidity = document.querySelector(".humidity");
const feelsLike = document.querySelector(".feels_like");
const cityName = document.querySelector(".city-name");
const error = document.querySelector(".error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
});
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const userInput = search.value;
  fetchData(userInput);
  search.value = "";
});

async function fetchData(userInput) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=5d4e0cecc35a04afea154e0ec8093ba3`;

  const resp = await fetch(url);
  const respData = await resp.json();
  //   console.log(respData);

  if (respData.cod !== "404") {
    output.classList.remove("hidden");
    error.classList.add("hidden");

    cityName.innerText = respData.name;
    temp.innerText = `${Math.floor(respData.main.temp - 273.15)}°C`;
    feelsLike.innerText = `Feels Like : ${Math.floor(
      respData.main.feels_like - 273.15
    )}°C`;
    humidity.innerText = `Humidity : ${respData.main.humidity}`;
    // console.log(respData.weather[0].main);
    if (respData.weather[0].main === "Clear") {
      tempStatus.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    } else if (respData.weather[0].main === "Rain") {
      tempStatus.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if (respData.weather[0].main === "Clouds") {
      tempStatus.innerHTML = '<i class="fas fa-cloud"></i>';
    } else if (respData.weather[0].main === "Haze") {
      tempStatus.innerHTML = '<i class="fas fa-cloud"></i>';
    } else {
      tempStatus.innerHTML = '<i class="fas fa-sun"></i>';
    }
  } else {
    error.classList.remove("hidden");
    output.classList.add("hidden");
  }
}
