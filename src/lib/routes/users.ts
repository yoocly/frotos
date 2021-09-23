import { Router } from 'express';
import { getCollection } from '../../utils/database';
import type { user } from '../models/users';
import { hashUserPassword } from '../models/users';

const router = Router();

router.post('/users/add', async (req, res) => {
  const user: user = req.body;
  const userPasswordHashed = await hashUserPassword(user);

  try {
    const dbResult = await getCollection('users').insertOne(userPasswordHashed);
    res.status(201).json({ ...dbResult, ...userPasswordHashed });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// const r = jwt.sign(userData.password, process.env.JWT_SECRET || '');
export default router;
