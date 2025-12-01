import {JokeResponse} from './models';

export async function getJoke(): Promise<string> {
  const res: JokeResponse = await (
    await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  console.log(res.joke);

  return res.joke;
}