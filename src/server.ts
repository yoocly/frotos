import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const port = process.env.EXPRESS_PORT || 3001;
const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/storybook', express.static('dist/storybook'));
app.use(express.static('dist/app'));

app.get('/api/', async (_req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(`Storybook is at http://localhost:${port}/storybook`);
});
