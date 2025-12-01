import {getJoke, addVote} from './script.js';
// import '../src/css/style.css';

export async function printJoke(): Promise<void> {
  const joke = await getJoke();
  const container = document.getElementById('joke');
  container!.textContent = joke;
}

export const vote = (vote: number) => {
  console.log(addVote(vote));
};

void printJoke();
