// Importing necessary modules and icons
import React from 'react';
import PropTypes from 'prop-types';
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";

// Definition of the WeatherDetails component
const WeatherDetails = ({ icon, climate, temp, city, wind, humidity, country, lat, log }) => {
  return (
    <>
      {/* Weather details */}
      <div className='image'>
        <img src={icon} alt="Im" />
      </div>
      <div className='climate'>{climate}</div>
      <div className='temp'>{temp}°C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>longitude</span>
          <span>{log}</span>
        </div>
      </div>
      {/* Additional weather data */}
      <div className='data-container'>
        {/* Humidity */}
        <div className='element'>
          <img src={humidityIcon} alt='humidity' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        {/* Wind speed */}
        <div className='element'>
          <img src={windIcon} alt='wind' className='icon' />
          <div className='data'>
            <div className='wind-percent'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  )
}

// PropTypes for type checking
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  climate: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
}

// Exporting the WeatherDetails component as default
export default WeatherDetails;
