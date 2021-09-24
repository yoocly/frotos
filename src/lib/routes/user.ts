import { Router } from 'express';
import type { user } from '../models/user';
import { addUser } from '../models/user';

const router = Router();

router.post('/user/add', async (req, res) => {
  const user: user = req.body;
  const { status, response } = await addUser(user);
  res.status(status).json({ response });
});

export default router;
