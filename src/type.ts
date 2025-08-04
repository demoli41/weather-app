export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  email: string;
  login: {
    uuid: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface ApiResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  temperature: number;
  windspeed: number;
  weathercode: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  daily: DailyWeather;
}