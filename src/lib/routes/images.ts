import { Router } from 'express';
import {
  addImage,
  deleteImage,
  downloadImage,
  getImage,
  imageColors,
  images,
} from '../models/images';
import { authenticate } from '../models/user';

const router = Router();

router.post('/images/download', downloadImage);
router.post('/images/colors', imageColors);
router.get('/images/:query/:page/:aspectRatio/:color', images);
router.get('/images/:imageId', authenticate(), getImage);
router.post('/images', authenticate(), addImage);
router.delete('/images', authenticate(), deleteImage);

export default router;
