import { Router } from 'express';
import { addImage, deleteImage, getImage, images } from '../models/images';
import { authenticate } from '../models/user';

const router = Router();

router.get('/images/:query/:page', images);
router.get('/images/:imageId', authenticate(), getImage);
router.post('/images', authenticate(), addImage);
router.delete('/images', authenticate(), deleteImage);

export default router;
