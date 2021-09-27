import { Router } from 'express';
import { addImage, images } from '../models/images';
import { authenticate } from '../models/user';

const router = Router();

router.get('/images/:query/:page', images);
router.post('/images/add', authenticate(), addImage);

export default router;
