import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';  // Import the loader

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Add loading state

  const API_KEY = 'd4551135c35e5aa2968ada4a0b1a7c8b';  // Your API key

  const formatCity = (city) => {
    return city.trim().toLowerCase();
  };

  const fetchWeather = async (city) => {
    setIsLoading(true);  // Start loading
    setError('');
    try {
      const formattedCity = formatCity(city);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('City not found. Please try again.');
        } else if (err.response.status === 401) {
          setError('Invalid API key. Please check your API key.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('An error occurred. Please check your network connection.');
      }
      setWeather(null);
    }
    setIsLoading(false);  // Stop loading after the request finishes
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {isLoading && <Loader />}  {/* Show loader when loading */}
      {error && <ErrorMessage message={error} />}
      {weather && !isLoading && <WeatherCard weather={weather} />}  {/* Show weather card only when not loading */}
    </div>
  );
};

export default App;
