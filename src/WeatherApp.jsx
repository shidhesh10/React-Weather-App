import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./App.css";

export default function WeatherApp() {
  // Weather state (default values shown before any search)
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    feelsLike: 24.8,
    temp: 25,
    tempMin: 25,
    tempMax: 25,
    humidity: 47,
    weather: "haze",
  });

  // Error state → true when city not found
  const [error, setError] = useState(false);

  // Update weather data from SearchBox
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
    setError(false);
  };

  // Decide background theme based on weather
  const w = weatherInfo.weather.toLowerCase();
  let mood = "mood-default";

  if (w.includes("rain") || w.includes("storm")) mood = "mood-rainy";
  else if (w.includes("cloud")) mood = "mood-cloudy";
  else if (w.includes("snow")) mood = "mood-cold";
  else if (w.includes("clear") || w.includes("sun")) mood = "mood-hot";

  return (
    <div className={`weather-app ${mood}`}>
      <h1 className="app-title">Weather App</h1>

      <div className="card-wrapper">
        {/* Search Bar */}
        <SearchBox updateInfo={updateInfo} setError={setError} error={error} />

        {/* Weather card is shown only when there is no error */}
        {!error && <InfoBox info={weatherInfo} />}
      </div>
    </div>
  );
}
