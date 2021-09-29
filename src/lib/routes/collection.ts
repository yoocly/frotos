import { Router } from 'express';
import {
  addCollection,
  deleteCollection,
  getCollectionImages,
  getCollections,
} from '../models/collection';
import { authenticate } from '../models/user';

const router = Router();

router.get('/collections', authenticate(), getCollections);
router.post('/collections', authenticate(), addCollection);
router.delete('/collections', authenticate(), deleteCollection);

router.get('/collections/:collectionId', authenticate(), getCollectionImages);

export default router;
