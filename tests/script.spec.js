import { getJoke, addVote, getMeteo, getWeatherInfo, countJokes, reportAcudits, _resetForTests } from '../build/script.js';
import { jest } from "@jest/globals";
import descriptions from "../src/weather/descriptions.json";

global.fetch = jest.fn();

beforeEach(async () => {
    jest.resetModules();
});

describe('Function "getJoke"', () => {
    it('should be declared', () => {
        expect(typeof getJoke).toBe('function');
    });

    it("increments countJokes", () => {
        expect(countJokes).toBe(0);
    });

    it("increments countJokes", () => {
        expect(reportAcudits.length).toBe(0);
    });

    it("should call the right API and responde with a joke", async () => {
        const fakeResponse = { id: 20, joke: "haha", status: 200 };
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(fakeResponse)
        });

        const result = await getJoke();

        expect(fetch).toHaveBeenCalledWith("https://icanhazdadjoke.com/", { "headers": { "Accept": "application/json" } });
        expect(result).toEqual(fakeResponse.joke);
        _resetForTests();
    });

    it("should give the error if the status of the response is not is not 200", async () => {
        const fakeResponse = { id: 20, status: 404 };
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(fakeResponse)
        });

        const result = await getJoke();

        expect(result).toEqual("Nothing to laught... Houston, we've had a problem here");
        _resetForTests();
    });

    it("should call a Chuck Norris Joke at the second call", async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ joke: "dad joke", status: 200 })
        });
        await getJoke();
        const fakeResponse = { id: 20, value: "haha", status: 200 };
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(fakeResponse)
        });
        const result = await getJoke();

        expect(fetch).toHaveBeenCalledWith("https://api.chucknorris.io/jokes/random", { "headers": { "Accept": "application/json" } });
        expect(result).toEqual(fakeResponse.value);
        _resetForTests();
    });

    it("should increment reportAcudits", async () => {
        const fakeResponse = { id: 20, joke: "haha", status: 200 };
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(fakeResponse)
        });

        await getJoke();

        expect(reportAcudits.length).toBe(1);
        expect(reportAcudits[0].joke).toBe(fakeResponse.joke);
        expect(reportAcudits[0].score).toBeUndefined();
        _resetForTests();
    });
});
describe('Function "addVote"', () => {
    it('should be declared', () => {
        expect(typeof addVote).toBe('function');
    });

    it('should modify the reportAcudits last object to add the vote', () => {
        const joke = {
            joke: 'haha',
            score: undefined,
            date: new Date().toISOString()
        }

        reportAcudits.push(joke);
        const result = addVote(3);

        expect(result[0].score).toBe(3);
        _resetForTests();
    });
});
describe('Function "getMeteo"', () => {
    it('should be declared', () => {
        expect(typeof getMeteo).toBe('function');
    });

    it('should call fetch with the correct URL and return JSON data', async () => {
        const params = {
            latitude: 41.3888,
            longitude: 2.159,
            hourly: "weather_code",
            timezone: "Europe/Berlin",
            forecast_days: 1,
        };

        const mockResponse = { data: 'ok' };
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });
        const result = await getMeteo(params);

        expect(global.fetch).toHaveBeenCalledWith("https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=weather_code&timezone=Europe%2FBerlin&forecast_days=1");
        expect(result).toBe(mockResponse);
        _resetForTests();
    });

    it('should throw an error when response.ok is false', async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: jest.fn(),
        });

        await expect(
            getMeteo({ latitude: 40, longitude: 2 })
        ).rejects.toThrow('Error Open-Meteo');
    });
});
describe('Function "getWeatherInfo"', () => {
    it('should be declared', () => {
        expect(typeof getWeatherInfo).toBe('function');
    });

    it('should return a meteo description object', () => {
        const expected = descriptions[0].day
        const result = getWeatherInfo(0)

        expect(result.description).toBe(expected.description);
        expect(result.image).toBe(expected.image);
    });
});
