import { Router } from 'express';
import { addUser, checkUserExists } from '../models/user';

const router = Router();

router.post('/user/add', async (req, res) => {
  const { status, response } = await addUser(req.body);
  res.status(status).json({ response });
});

router.post('/user/check', async (req, res) => {
  // const { status, response } =
  res.json(await checkUserExists(req.body));
  // res.status(status).json({ response });
});

export default router;
