import { Router } from 'express';
import { dbInsertOne } from '../../utils/database';
import type { user } from '../models/user';
import { hashUserPassword } from '../models/user';

const router = Router();

router.post('/user/add', async (req, res) => {
  const user: user = req.body;
  const userPasswordHashed = await hashUserPassword(user);

  const assertNoClearPassword = (user: user) =>
    user.password === undefined ? true : 'Payload contains clear password';

  const { status, response } = await dbInsertOne(userPasswordHashed, assertNoClearPassword);
  res.status(status).json({ response });
});

// const r = jwt.sign(userData.password, process.env.JWT_SECRET || '');
export default router;
