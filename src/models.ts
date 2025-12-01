/* eslint-disable prettier/prettier */
export interface JokeResponse {
  id: string;
  joke: string;
  status: number;
}

export interface Joke {
  joke: string;
  score: number | undefined;
  date: string;
}
