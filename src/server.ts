import dotenv from 'dotenv';
import express from 'express';
import { images } from './api/images';
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/storybook', express.static('dist/storybook'));

app.get('/api/images/:query/:page', async (req, res) => {
  await images(req, res);
});
app.get('/api/images/', async (_req, res) => {
  res.status(400).json();
});

app.get('/api/', async (_req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.use(express.static('dist/app'));
app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' });
});

app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(`Storybook is at http://localhost:${port}/storybook`);
});
