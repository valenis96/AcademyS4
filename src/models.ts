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
  day: { description: string; image: string };
  night: { description: string; image: string };
}