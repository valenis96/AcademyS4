/* eslint-disable prettier/prettier */
export interface JokeResponse {
  id: string;
  joke: string;
  status: number;
}

export interface Joke {
  joke: string;
  score: number | undefined;
  date: string;
}

export interface WeatherParams {
  latitude: number,
  longitude: number,
  hourly: string,
  timezone: string,
  forecast_days: number,
};

export interface WeatherCodeInfo {
  day: WeatherDescription;
  night: WeatherDescription;
}

export interface WeatherDescription {
  description: string | null;
  image: string | null;
}