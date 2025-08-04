'use client';

import { useCallback,useEffect, useState } from 'react';
import { User, WeatherData } from '@/type';
import { getWeatherDescription } from '@/utils/weather-utils';

interface WeatherCardBackProps {
  user: User;
  onClose: () => void;
}

export default function WeatherCardBack({ user, onClose }: WeatherCardBackProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setIsLoading(true);
    const { latitude, longitude } = user.location.coordinates;
    const url = `/api/weather?latitude=${latitude}&longitude=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(() => {
      fetchWeather();
    }, 300000);
    return () => clearInterval(interval);
  }, [user, fetchWeather]);

  const weatherDescription = weatherData?.current_weather?.weathercode
    ? getWeatherDescription(weatherData.current_weather.weathercode)
    : null;

 return (
    <div className="relative w-full h-full flex flex-col justify-between items-center text-center">
      <h3 className="text-2xl font-bold">
        Weather in {user.location.city}
      </h3>
      {isLoading && <p>Loading weather...</p>}
      {error && <p className="text-red-500">Error fetching weather.</p>}
      {weatherData && (
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="flex items-center mb-4">
            <span className="text-5xl mr-2">{weatherDescription?.icon}</span>
            <p className="text-xl font-semibold">
              {weatherDescription?.description}
            </p>
          </div>
            <p className="text-lg">
              Current Temperature: {weatherData?.current_weather?.temperature}°C
            </p>
            <p className="text-lg">
              Min Temperature: {weatherData?.daily?.temperature_2m_min[0]}°C
            </p>
            <p className="text-lg">
              Max Temperature: {weatherData?.daily?.temperature_2m_max[0]}°C
            </p>
            <p className="text-lg">
              Wind Speed: {weatherData?.current_weather?.windspeed} km/h
            </p>
        </div>
      )}
      <button
        onClick={onClose}
        className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go back
      </button>
    </div>
  );
}