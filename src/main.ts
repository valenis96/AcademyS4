import { getJoke, addVote, getMeteo, getWeatherInfo } from './script.js';

const params = {
  latitude: 41.3888,
  longitude: 2.159,
  hourly: "weather_code",
  timezone: "Europe/Berlin",
  forecast_days: 1,
};

export async function printJoke(): Promise<void> {
  const joke = await getJoke();
  const container = document.getElementById('joke');
  container!.textContent = joke;
}

export const vote = (vote: number) => {
  console.log(addVote(vote));
};

const logMeteo = async () => {
  getMeteo(params).then(data => {
    const weatherCode = data.hourly.weather_code[new Date().getHours()]
    console.log(getWeatherInfo(weatherCode));
  });
};


void printJoke();
void logMeteo();
