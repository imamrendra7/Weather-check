const apiKey = '9f30ec46e50164b10bd41f09397980c4';

async function getWeather(cityName) {
  const city = cityName || document.getElementById("cityInput").value;
  const weatherBox = document.getElementById("weatherInfo");

  if (!city) {
    weatherBox.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      weatherBox.innerHTML = `Error: ${data.message}`;
      return;
    }

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const currentTime = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    const body = document.body;
    if (currentTime >= sunrise && currentTime <= sunset) {
      body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWy7p1Uoj7ad-9oK-dJCPPT21K-rdFO5YxWA&s')";   
    } else {
      body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_zcKuOukwVV41ilcFdbkpfo2Mflh9Kw5Lw&s')";
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="Weather Icon">
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;
    weatherBox.innerHTML = weatherHTML;

  } catch (error) {
    weatherBox.innerHTML = "Failed to fetch weather data.";
  }
}
