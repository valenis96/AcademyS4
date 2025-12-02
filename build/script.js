import descriptions from "./weather/descriptions.json";
export const reportAcudits = [];
export let countJokes = 0;
export async function getJoke() {
    const url = countJokes % 2 === 0 ? 'https://icanhazdadjoke.com/' : 'https://api.chucknorris.io/jokes/random';
    const res = await (await fetch(url, {
        headers: {
            Accept: 'application/json',
        },
    }))?.json();
    console.log(res);
    const joke = res.joke || res.value || '';
    reportAcudits.push({ joke, score: undefined, date: new Date().toISOString() });
    console.log(reportAcudits);
    countJokes++;
    return joke;
}
export const addVote = (score) => {
    reportAcudits[reportAcudits.length - 1] = { ...reportAcudits[reportAcudits.length - 1], score };
    return reportAcudits;
};
export async function getMeteo(params) {
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
export function getWeatherInfo(code, isNight = false) {
    const info = descriptions[code];
    if (!info)
        return null;
    return isNight ? info.night : info.day;
}
