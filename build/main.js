import { getJoke, addVote, getMeteo, getWeatherInfo } from './script.js';
const params = {
    latitude: 41.3888,
    longitude: 2.159,
    hourly: "weather_code",
    timezone: "Europe/Berlin",
    forecast_days: 1,
};
export async function printJoke() {
    const joke = await getJoke();
    const container = document.getElementById('joke');
    container.textContent = joke;
}
export const vote = (vote) => {
    console.log(addVote(vote));
};
const logMeteo = async () => {
    getMeteo(params).then(data => {
        const weatherCode = data.hourly.weather_code[new Date().getHours()];
        const meteo = getWeatherInfo(weatherCode);
        const containersDesc = document.getElementsByClassName('meteo-description');
        const containersImg = document.getElementsByClassName('meteo-image');
        for (const container of containersDesc)
            container.textContent = meteo?.description || null;
        for (const container of containersImg) {
            if (container instanceof HTMLImageElement) {
                container.src = meteo?.image || 'no image available';
                container.alt = meteo?.description || 'meteo';
            }
        }
        ;
    });
};
void printJoke();
void logMeteo();
