import { Router } from 'express';
import { images } from '../../api/images';

const router = Router();

router.get('/images/:query/:page', async (req, res) => {
  await images(req, res);
});

router.get('/images/', async (_req, res) => {
  res.status(400).json();
});

export default router;
