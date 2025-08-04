

export const getWeatherDescription = (code: number) => {
  const weatherCodes: { [key: number]: { icon: string; description: string } } = {
    0: { icon: '☀️', description: 'Clear sky' },
    1: { icon: '🌤️', description: 'Mainly clear' },
    2: { icon: '⛅️', description: 'Partly cloudy' },
    3: { icon: '☁️', description: 'Overcast' },
    45: { icon: '🌫️', description: 'Fog' },
    48: { icon: '🌫️', description: 'Depositing rime fog' },
    51: { icon: '🌧️', description: 'Light drizzle' },
    53: { icon: '🌧️', description: 'Moderate drizzle' },
    55: { icon: '🌧️', description: 'Dense drizzle' },
    61: { icon: '🌧️', description: 'Slight rain' },
    63: { icon: '🌧️', description: 'Moderate rain' },
    65: { icon: '🌧️', description: 'Heavy rain' },
    71: { icon: '❄️', description: 'Slight snow fall' },
    73: { icon: '❄️', description: 'Moderate snow fall' },
    75: { icon: '❄️', description: 'Heavy snow fall' },
    80: { icon: '🌨️', description: 'Slight rain showers' },
    81: { icon: '🌨️', description: 'Moderate rain showers' },
    82: { icon: '🌨️', description: 'Violent rain showers' },
    95: { icon: '🌩️', description: 'Thunderstorm' },
    96: { icon: '⛈️', description: 'Thunderstorm with slight hail' },
    99: { icon: '⛈️', description: 'Thunderstorm with heavy hail' },
  };
  return weatherCodes[code] || { icon: '❓', description: 'Unknown' };
};