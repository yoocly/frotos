import { Router } from 'express';
import { addCollection, deleteCollection, getCollections } from '../models/collection';
import { authenticate } from '../models/user';

const router = Router();

router.get('/collections', authenticate(), getCollections);
router.post('/collections/add', authenticate(), addCollection);
router.delete('/collections/delete', authenticate(), deleteCollection);

export default router;
