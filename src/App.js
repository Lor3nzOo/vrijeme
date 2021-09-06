import React, { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);

  function handleCity(e) {
    setCity(e.target.value.toLowerCase());
  }

  function handleState(e) {
    setState(e.target.value.toLowerCase());
  }

  function handleZip(e) {
    setZip(e.target.value.toLowerCase());
  }

  function getWeatherData() {
    const navL = navigator.language;
    const nav = navL.split("-");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${zip}&appid=909b25942a91dd2c10a0a46a8e77451a&lang=${nav[0]}&units=metric`
    )
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (weatherData !== null) {
    const icon = weatherData.weather.map(({ icon }) => icon);
    const src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    return (
      <div className="App">
        <section className="controls">
          <input type="text" placeholder="Grad" onChange={handleCity} />
          <input type="text" placeholder="Država" onChange={handleState} />
          <input
            type="text"
            placeholder="Poštanski broj"
            onChange={handleZip}
          />
          <button onClick={getWeatherData}>Klikni za vrijeme</button>
          <ul>
            <li className="lista">
              Vrijeme:{" "}
              {weatherData.weather.map(
                ({ description }) =>
                  description.charAt(0).toUpperCase() + description.slice(1)
              )}
            </li>
            <li className="lista2">
              <img alt="picture" src={src} />
            </li>
            <li className="lista2">
              Temperatura: {weatherData.main.temp}&deg;C
            </li>
            <li className="lista">
              Osjet: {weatherData.main.feels_like}&deg;C
            </li>
            <li className="lista">
              Minimalna temperatura: {weatherData.main.temp_min}&deg;C
            </li>
            <li className="lista">
              Maksimalna temperatura: {weatherData.main.temp_max}&deg;C
            </li>
            <li className="lista">Vlažnost: {weatherData.main.humidity}%</li>
            <li className="lista">Tlak: {weatherData.main.pressure}hPa</li>
            <li className="lista">Oblaci: {weatherData.clouds.all}%</li>
            <li className="lista">
              Brzina vjetra:{" "}
              {weatherData.wind.speed.toFixed(1) * (3.6).toFixed(0)}
              km/h
            </li>
          </ul>
        </section>
        <div className="section3">
          <h1>&copy; Lorenzo Melon 2021</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <section className="controls">
          <input type="text" placeholder="Grad" onChange={handleCity} />
          <input type="text" placeholder="Država" onChange={handleState} />
          <input
            type="text"
            placeholder="Poštanski broj"
            onChange={handleZip}
          />
          <button onClick={getWeatherData}>Klikni za vrijeme</button>
        </section>
        <div className="section2">
          <h1>&copy; Lorenzo Melon 2021</h1>
        </div>
      </div>
    );
  }
}

export default App;
