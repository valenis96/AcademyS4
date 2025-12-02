import { getJoke, addVote, getMeteo, getWeatherInfo, countJokes } from '../build/script.js';
import { jest } from "@jest/globals";

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

    it("should call the right API and responde with a joke", async () => {
        const fakeResponse = { id: 20, joke: "haha" };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(fakeResponse)
        });

        const result = await getJoke();
        expect(fetch).toHaveBeenCalledWith("https://icanhazdadjoke.com/", { "headers": { "Accept": "application/json" } });
        expect(result).toEqual(fakeResponse.joke);
    });

    it("should call a Chuck Norris Joke at the second call", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ joke: "dad joke" })
        });
        await getJoke();
        const fakeResponse = { id: 20, value: "haha" };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(fakeResponse)
        });
        const result = await getJoke();
        expect(fetch).toHaveBeenCalledWith("https://api.chucknorris.io/jokes/random", { "headers": { "Accept": "application/json" } });
        expect(result).toEqual(fakeResponse.value);
    });
});
describe('Function "addVote"', () => {
    it('should be declared', () => {
        expect(typeof addVote).toBe('function');
    });
});
describe('Function "getMeteo"', () => {
    it('should be declared', () => {
        expect(typeof getMeteo).toBe('function');
    });
});
describe('Function "getWeatherInfo"', () => {
    it('should be declared', () => {
        expect(typeof getWeatherInfo).toBe('function');
    });
});
