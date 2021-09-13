import React, { useState} from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  function handleCity(e) {
    setCity(e.target.value.toLowerCase());
  }

  function getWeatherData() {
    const navL = navigator.language;
    const nav = navL.split("-");

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=909b25942a91dd2c10a0a46a8e77451a&lang=${nav[0]}&units=metric`).then(response => {
      setError(null)
      setWeatherData(response.data);
    }).catch((error) => {
      setWeatherData(null);
      setShow(true);
      if (error.toString().includes(404)) {
        setError("Grad ili Naselje nije pronađeno...")
      } else {
        setError(error.toString())
      }
    });
  }

  if (weatherData !== null) {
    const icon = weatherData.weather.map(({ icon }) => icon);
    const src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
      <div className="App">
      {error && show && 
          <Alert className="mt-4" variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>}
        <section className="kontrole">
          <input type="text" placeholder="Grad ili Naselje" onChange={handleCity} />
          <button className="cta" onClick={getWeatherData} >Klikni za vrijeme</button>
        </section>
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
        <div className="kopirajt">
          <h1>&copy; Lorenzo Melon 2021</h1>
        </div>
      </div>
   );
  } else {
    return (
      <div className="App">
        {error && show && <Alert className="mt-4" variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{error}</Alert.Heading>
      </Alert>}
        <section className="kontrole">
          <input type="text" placeholder="Grad ili Naselje" onChange={handleCity} />
          <button className="cta" onClick={getWeatherData}>Klikni za vrijeme</button>
        </section>
        <div className="kopirajt">
          <h1>&copy; Lorenzo Melon 2021</h1>
        </div>
      </div>);
  }
}

export default App;
