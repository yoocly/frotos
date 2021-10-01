import { Router } from 'express';
import { addUser, checkUserExists, loginUser, logoutUser } from '../models/user';

const router = Router();

router.post('/user/check', checkUserExists);
router.post('/user', addUser);

router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);

export default router;
