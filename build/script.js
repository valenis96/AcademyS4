import descriptions from "./weather/descriptions.json";
const reportAcudits = [];
export async function getJoke() {
    const res = await (await fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json',
        },
    })).json();
    reportAcudits.push({ joke: res.joke, score: undefined, date: new Date().toISOString() });
    console.log(reportAcudits);
    return res.joke;
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
