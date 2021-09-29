import { Router } from 'express';
import { result } from '../../utils/responses';
import { addUser, authenticate, checkUserExists, loginUser, logoutUser } from '../models/user';

const router = Router();

router.post('/user/check', checkUserExists);
router.post('/user', addUser);

router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);

router.post('/user/checklogin', authenticate(false), async (req, res) => {
  result(req, res, { result: true }, 1);
});

export default router;
