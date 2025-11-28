import express from 'express';
const world = 'world';
export function hello(who = world) {
    return `Hello ${who}!`;
}
console.log(hello());
const app = express();
app.get('/', (req, res) => res.send('Hello from Express + TypeScript!'));
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
