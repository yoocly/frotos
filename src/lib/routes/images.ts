import { Router } from 'express';
import { images } from '../models/images';

const router = Router();

router.get('/images/:query/:page', images);

export default router;
