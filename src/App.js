import React, { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

    const [weatherData7, setWeatherData7] = useState(null);


  function handleCity(e) {
    setCity(e.target.value.toLowerCase());
  }

  function handleState(e){
      setState(e.target.value.toLowerCase());
  }

    function handleZip(e){
        setZip(e.target.value.toLowerCase());
    }

  function getWeatherData() {
    const navL = navigator.language;
    const nav = navL.split('-');

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${zip}&appid=909b25942a91dd2c10a0a46a8e77451a&lang=${nav[0]}&units=metric`
    )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch(() => {
          console.log("error");
        });
  }

  function getWeather7(){
      navigator.geolocation.getCurrentPosition(position => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const navL = navigator.language;
      const nav = navL.split('-');

      fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=909b25942a91dd2c10a0a46a8e77451a&lang=${nav[0]}&units=metric`
      )
          .then((response) => response.json())
          .then((data7) => {
              setWeatherData7(data7);
              console.log(data7);
          })
          .catch(() => {
              console.log("error");
          });
      });
  }

  if (weatherData !== null){
      const icon = weatherData.weather.map(({ icon }) => icon);
      const src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      return (
          <div className="App">
              <section className="controls">
                  <input
                      type="text"
                      placeholder="City"
                      onChange={handleCity}
                  />
                  <input
                      type="text"
                      placeholder="Country"
                      onChange={handleState}
                  />
                  <input
                      type="text"
                      placeholder="Zip code"
                      onChange={handleZip}
                  />
                  <button onClick={() => { getWeatherData(); getWeather7();}}>Get Weather</button>
                  <ul>
                      <li className="lista">Weather: {weatherData.weather.map(({ description }) => description.charAt(0).toUpperCase() + description.slice(1))}</li>
                      <li className="lista2"><img alt="picture" src={src} /></li>
                      <li className="lista2">Temperature: {weatherData.main.temp}&deg;C</li>
                      <li className="lista">Feels like: {weatherData.main.feels_like}&deg;C</li>
                      <li className="lista">Minimal temperature: {weatherData.main.temp_min}&deg;C</li>
                      <li className="lista">Max temperature: {weatherData.main.temp_max}&deg;C</li>
                      <li className="lista">Humidity: {weatherData.main.humidity}%</li>
                      <li className="lista">Pressure: {weatherData.main.pressure}hPa</li>
                      <li className="lista">Clouds: {weatherData.clouds.all}%</li>
                      <li className="lista">Wind speed: {weatherData.wind.speed.toFixed(1) * 3.60.toFixed(0)}km/h</li>
                  </ul>
              </section>

          </div>
      )
  } else {
      return (
          <div className="App">
              <section className="controls">
                  <input
                      type="text"
                      placeholder="City"
                      onChange={handleCity}
                  />
                  <input
                      type="text"
                      placeholder="Country"
                      onChange={handleState}
                  />
                  <input
                      type="text"
                      placeholder="Zip code"
                      onChange={handleZip}
                  />
                  <button onClick={() => { getWeatherData(); getWeather7();}}>Get Weather</button>
              </section>
          </div>
      )
  }

}

export default App;
