import { Joke, JokeResponse, WeatherCodeInfo, WeatherDescription, WeatherParams } from './models';
import descriptions from "./weather/descriptions.json";

export const reportAcudits: Joke[] = [];
export let countJokes = 0;

export async function getJoke(): Promise<string> {
  const url = countJokes % 2 === 0 ? 'https://icanhazdadjoke.com/' : 'https://api.chucknorris.io/jokes/random';
  const res: JokeResponse = await (
    await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    })
  )?.json();

  if (res.status !== 200) {
    return "Nothing to laught... Houston, we've had a problem here";
  }

  const joke = res.joke || res.value || '';

  reportAcudits.push({
    joke,
    score: undefined,
    date: new Date().toISOString()
  });
  console.log(reportAcudits);
  countJokes++;

  return joke;
}

export const addVote = (score: number): Joke[] => {
  reportAcudits[reportAcudits.length - 1] = { ...reportAcudits[reportAcudits.length - 1], score }
  return reportAcudits
}

export async function getMeteo(params: WeatherParams): Promise<any> {
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

export function getWeatherInfo(code: number, isNight: boolean = false): WeatherDescription | null {
  const info: WeatherCodeInfo | undefined = (descriptions as any)[code];
  if (!info) return null;
  return isNight ? info.night : info.day;
}

export function _resetForTests() {
  countJokes = 0;
  reportAcudits.length = 0;
}
