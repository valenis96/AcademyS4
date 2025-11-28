import { JokeResponse } from "./models";


async function getJoke(): Promise<JokeResponse> {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });

  return response.json();
}

getJoke().then(joke => {
  console.log(joke.joke);
});

