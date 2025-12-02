import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo, setError, error }) {
  // Local state to store user input (city name)
  let [city, setCity] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Function to fetch weather data for the entered city
  let getWeatherInfo = async () => {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    // If API returns an error (e.g., invalid city)
    if (!response.ok) {
      throw new Error("City not found");
    }

    let json = await response.json();

    // Returning only required weather details
    return {
      city: json.name,
      temp: json.main.temp,
      tempMin: json.main.temp_min,
      tempMax: json.main.temp_max,
      humidity: json.main.humidity,
      feelsLike: json.main.feels_like,
      weather: json.weather[0].description,
    };
  };

  // Handles form submit → Fetch weather + update parent component
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let info = await getWeatherInfo();
      updateInfo(info); // Pass data to parent
      setError(false);  // Hide previous errors
      setCity("");      // Clear input after successful search
    } catch (err) {
      setError(true);   // Show error message
    }
  };

  // Track input changes
  let handleChange = (e) => {
    setCity(e.target.value);
    setError(false); // Remove error while typing
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        {/* City input field */}
        <TextField
          id="city-basic"
          label="City Name"
          variant="standard"
          required
          value={city}
          onChange={handleChange}
        />

        <div style={{ marginTop: "18px" }}>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </div>

        {/* Error message for “city not found” */}
        {error && (
          <p className="error-msg">❌ No such place exists. Try another city.</p>
        )}
      </form>
    </div>
  );
}
