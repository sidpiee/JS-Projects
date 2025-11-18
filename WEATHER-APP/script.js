document.addEventListener("DOMContentLoaded", () => {
  let cityinput = document.getElementById("city-input");
  let getWeatherBtn = document.getElementById("get-weather-btn");
  let weatherInfo = document.getElementById("weather-info");
  let temperature = document.getElementById("temprature");
  let discription = document.getElementById("description");
  let cityName = document.getElementById("city-name");
  let weatherImg = document.getElementById("weather-img");
  let errorMessage = document.getElementById("error-message");
  let API_KEY = ""; // replace with your actual API key

  getWeatherBtn.addEventListener("click", async function () {
    const city = cityinput.value.trim();
    if (!city) return;
    //it may throw error -- the server may not always return what we expect
    // server/database is always in another continent(means it will always take time)
    try {
      let weatherdata = await fetchWeatherData(city);
      displayWeatherData(weatherdata);
    } catch (error) {
      showerror();
      console.log(error);
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);
    if (!response.ok) throw new Error("city not found");

    let data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { main, weather, name } = data;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    cityinput.value = "";
    cityName.textContent = name;
    temperature.textContent = `${main.temp}°C`;
    discription.textContent = weather[0].description;
    weatherImg.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherImg.className = "size-30";
  }

  function showerror() {
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
});
