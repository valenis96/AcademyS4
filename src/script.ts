import {Joke, JokeResponse} from './models';

const reportAcudits: Joke[] = [];

export async function getJoke(): Promise<string> {
  const res: JokeResponse = await (
    await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  reportAcudits.push({joke: res.joke, score: undefined, date: new Date().toISOString()})
  console.log(reportAcudits);

  return res.joke;
}

export const addVote = (score: number) => {
  reportAcudits[reportAcudits.length-1] = { ...reportAcudits[reportAcudits.length-1], score}
  return reportAcudits
}