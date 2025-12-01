import {getJoke} from './script.js';
// import '../src/css/style.css';

export async function printJoke(): Promise<void> {
  const joke = await getJoke();
  const container = document.getElementById('joke');
  container!.textContent = joke;
}

void printJoke();
