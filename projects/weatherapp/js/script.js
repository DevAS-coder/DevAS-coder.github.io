const smtBtn = document.getElementById("submit");
let body = document.querySelector("body");
let loader = document.querySelector(".loader");
let spinner = document.querySelector(".spinner");
let cityNameElem = document.querySelector(".location");
let weatherDisElem = document.querySelector(".status");
let uptemp = document.querySelector(".temperature");
let timeElem = document.querySelector(".time");
let tempElem = document.querySelector(".temp");
let windSpeedElem = document.querySelector(".windspeed");
let humidityElem = document.querySelector(".humidity");
let weatherapp = document.querySelector(".weather-app");
let icon = document.querySelector(".icon");
let inp = document.getElementById("inp");

function hide_spinner() {
  loader.style.display = "none";
  weatherapp.style.display = "block";
}

function show_spinner() {
  loader.style.display = "flex";
  spinner.style.display = "block";
  weatherapp.style.display = "none";
}

function getweather() {
  show_spinner();
  let notif = document.querySelector(".notifier").innerHTML = 'Loading...';
  let cityname = document.getElementById("inp").value;

  let url = `https://api.weatherstack.com/current?access_key=4b36c6d2ca23e7fdcb89b5f43f6312ba&query=${cityname}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.error("error ${response.status}");
      }
      
      return response.json();
    })
    .then(data => {
      
      if (data.error != undefined) {
        let notif = document.querySelector(".notifier").innerHTML = 'Something Went Wrong Check Your City Name. Check Spaces or Anything Else';
      } else{

        let CityName = data.location.name;
        let Countryname = data.location.country;
        let LocalTime = data.location.localtime;
        let time = LocalTime.split(" ")
        let hour = time[1].split(':')
        let Temp = data.current.temperature;
        let windSpeed = data.current.wind_speed;
        let humidity = data.current.humidity;
        let wheatherDis = data.current.weather_descriptions;
  
        cityNameElem.innerHTML = CityName + ", " + Countryname;
        timeElem.innerHTML = LocalTime;
        tempElem.innerHTML = Temp+'°C';
        windSpeedElem.innerHTML = windSpeed + " km/h";
        humidityElem.innerHTML = humidity+'%';
        weatherDisElem.innerHTML = wheatherDis;
        uptemp.innerHTML = Temp+'°';
        
        icon.innerHTML = getWeatherIcon(wheatherDis[0],hour)
  
        hide_spinner();
      }

    });
}

function getWeatherIcon(condition, hour) {
  let texticon = "";
  condition = condition.toLowerCase();

  if (condition === "clear" || condition === "clear ") {
      if (hour >= 6 && hour < 18) {
          texticon = "☀️"; 
      } else {
          texticon = "🌙";
          body.style.backgroundColor = '#004078'
      }
  } else if (condition === "cloudy") {
      texticon = "☁️"; 
  } else if (condition === "fog") {
      texticon = "🌫️"; 
  } else if (condition === "haze") {
      texticon = "🌫️"; 
  } else if (condition === "mist") {
      texticon = "🌫️"; 
  } else if (condition === "heavy rain") {
      texticon = "⛈️"; 
  } else if (condition === "light rain" || condition === "light rain shower") {
      texticon = "🌧️"; 
  } else if (condition === "overcast") {
      texticon = "☁️";
  } else if (condition === "partly cloudy") {
      texticon = "🌤️"; 
  } else if (condition === "snow") {
      texticon = "❄️"; 
  } else if (condition === "sunny") {
      texticon = "☀️";
  } else if (condition === "patchy rain nearby") {
    texticon = "🌦️";
  }
  else {
      texticon = "❓"
  }

  return texticon;
}

smtBtn.addEventListener("click", getweather);
inp.addEventListener('keyup', function(e) {
  if(e.code == "Enter"){
    getweather()
  }
})
