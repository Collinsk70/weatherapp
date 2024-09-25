import React from 'react';

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherDetails } = weather;
  const iconCode = weatherDetails[0].icon;  // Extract the icon code
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;  // URL for the icon

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weatherDetails[0].description} /> {/* Display the weather icon */}
      <p>Temperature: {main.temp} °C</p>
      <p>Weather: {weatherDetails[0].description}</p>
      <p>Humidity: {main.humidity} %</p>
    </div>
  );
};

export default WeatherCard;
