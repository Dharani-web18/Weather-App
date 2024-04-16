// Importing necessary modules and components
import React, { useState, useEffect, useRef } from 'react';
import "./App.css";

// Importing icons
import searchIcon from "./assets/search.png";
import clearskydayIcon from "./assets/clear.jpg";
import clearsunIcon from "./assets/clearsun.png";
import drizzleIcon from "./assets/drizzle.jpg";
import clearskynightIcon from "./assets/clearnight.jpg";
import cloudIcon from "./assets/cloud.png";
import brokencloudIcon from "./assets/brokencloud.jpg";
import thunderIcon from "./assets/thunder.png";
import snowIcon from "./assets/snow1.jpg";
import rainIcon from "./assets/rain.jpg";
import mistIcon from "./assets/mist.jpg";

// Importing WeatherDetails component and CITY_DATA
import WeatherDetails from './WeatherDetails';
import CITY_DATA from "./CITY_DATA.json";

// Definition of the App component
function App() {
  // API key for weather data
  const api_key = "742ba0ef452f6870b5c07cc1ba322999";

  // State variables for weather information and user input
  const [text, setText] = useState("");
  const [icon, setIcon] = useState(snowIcon);
  const [climate, setClimate] = useState("");
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null); // Ref for the input element

  // Object mapping weather icon codes to corresponding icons
  const weatherIconMap = {
    "01d": clearskydayIcon,
    "01n": clearskynightIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": brokencloudIcon,
    "04n": brokencloudIcon,
    "09d": drizzleIcon,
    "09n": drizzleIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": thunderIcon,
    "11n": thunderIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon
  };

  // Function to fetch weather data based on user input
  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      // Setting weather information based on fetched data
      setClimate(data.weather[0].description);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearsunIcon);
      setCityNotFound(false);
      setError(false);
    } catch (error) {
      console.error("An error occurred", error.message);
      setError("An error occurred while fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user input for city search
  const handleCity = (e) => {
    const value = e.target.value;
    setText(value);
    if (value) {
      // Filtering city suggestions based on user input
      const filteredSuggestions = CITY_DATA.filter((city) =>
        city.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle click on a suggestion
  const handleSuggestionClick = (value) => {
    setText(value);
    setSuggestions([]);
    inputRef.current.focus(); // Setting focus on the input after selecting a suggestion
  };

  // Function to handle key down events (e.g., pressing Enter to search)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  // Effect hook (empty dependencies) for initialization
  useEffect(() => {}, []);

  // JSX for rendering the component
  return (
    <>
      <div className='container'>
        {/* Input container with search bar and search icon */}
        <div className='input-container'>
          <input
            ref={inputRef} // Assigning the ref to the input element
            type='text'
            className='cityInput'
            placeholder='Search City'
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className='search-icon' onClick={search}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
        {/* Loading, error, and not found messages */}
        {loading && <div className='loading-message'>Loading...</div>}
        {error && <div className='error-message'>{error}</div>}
        {cityNotFound && <div className='city-not-found'>City not found</div>}
        {/* Suggestions dropdown */}
        <div className='suggestions-dropdown'>
          {suggestions.map((suggest, index) => (
            <div key={index} className='suggestion' onClick={() => handleSuggestionClick(suggest.name)}>
              {suggest.name}
            </div>
          ))}
        </div>
        {/* Displaying weather details */}
        {!loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            climate={climate}
            country={country}
            lat={lat}
            log={log}
            humidity={humidity}
            wind={wind}
          />
        )}
      </div>
    </>
  )
}

// Exporting the App component as default
export default App;
