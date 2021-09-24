import type { InsertOneResult } from 'mongodb';
import type { dbResult } from '../../utils/database';
import { dbFindOne, dbInsertOne } from '../../utils/database';
import { hashPassword } from '../../utils/hashPassword';

export type user = { username: string; password?: string; passwordHash?: string };

export async function hashUserPassword(user: user): Promise<user> {
  const hash = user.password !== undefined ? await hashPassword(user.password) : undefined;
  const userPasswordHashed = { ...user, passwordHash: hash, password: undefined };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = userPasswordHashed;
  return userWithoutPassword;
}

export async function addUser(user: user): dbResult<InsertOneResult, user> {
  const userPasswordHashed = await hashUserPassword(user);

  const assertNoClearPassword = (user: user) =>
    user.password === undefined ? true : 'Payload contains clear password';

  return await dbInsertOne('user', userPasswordHashed, assertNoClearPassword);
}

export async function checkUserExists(user: user): dbResult<unknown, user> {
  const { username } = user;

  const dbResult = await dbFindOne('users', { username });
  dbResult.response.result = dbResult.status === 200;

  return dbResult;
}
