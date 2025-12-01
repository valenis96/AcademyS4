import { Joke, JokeResponse, WeatherCodeInfo, WeatherParams } from './models';
import descriptions from "./weather/descriptions.json";

const reportAcudits: Joke[] = [];

export async function getJoke(): Promise<string> {
  const res: JokeResponse = await (
    await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  reportAcudits.push({ joke: res.joke, score: undefined, date: new Date().toISOString() })
  console.log(reportAcudits);

  return res.joke;
}

export const addVote = (score: number) => {
  reportAcudits[reportAcudits.length - 1] = { ...reportAcudits[reportAcudits.length - 1], score }
  return reportAcudits
}

export async function getMeteo(params: WeatherParams) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Error Open-Meteo");
  }

  return await response.json();
}

export function getWeatherInfo(code: number, isNight: boolean = false): WeatherCodeInfo["day"] | null {
  const info: WeatherCodeInfo | undefined = (descriptions as any)[code];
  if (!info) return null;
  return isNight ? info.night : info.day;
}
