import type { InsertOneResult } from 'mongodb';
import { dbFindOne, dbInsertOne, getCollection } from '../../utils/database';
import { hashPassword, verifyPassword } from '../../utils/hashPassword';
import type { backendResponse } from '../../utils/backendResponse';
import { result, error } from '../../utils/backendResponse';

export type user = { username: string; password?: string; passwordHash?: string };
export const USER_ERROR = {
  USER_NOT_FOUND: { code: 404, description: 'User not found' },
  NO_PASSWORD: { code: 501, description: 'No password' },
  INVALID_USERNAME: { code: 502, description: 'Invalid username' },
  INVALID_DB_ENTRY: { code: 503, description: 'Invalid database entry' },
  INCORRECT_PASSWORD: { code: 504, description: 'Incorrect password' },
  ADD_USER_FAILED: { code: 505, description: 'Failed to add user' },
};

const usersCollection = 'users';

export async function hashUserPassword(user: user): Promise<user> {
  const hash = user.password !== undefined ? await hashPassword(user.password) : undefined;
  const userPasswordHashed = { ...user, passwordHash: hash, password: undefined };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = userPasswordHashed;
  return userWithoutPassword;
}

export async function addUser(user: user): Promise<backendResponse<InsertOneResult<user>, user>> {
  const userPasswordHashed = await hashUserPassword(user);

  const dbResult = await dbInsertOne(
    usersCollection,
    userPasswordHashed,
    (user: user) => user.password === undefined
  );
  if (dbResult === null) return error(USER_ERROR.ADD_USER_FAILED, user);
  return result(dbResult, user);
}

export async function checkUserExists(user: user): Promise<backendResponse<boolean, user>> {
  const { username } = user;

  const dbResponse = await getCollection(usersCollection).findOne<user>({
    username,
  });

  if (dbResponse === null) return error(USER_ERROR.USER_NOT_FOUND, user, 404);
  return result(true, user);
}

export async function loginUser(user: user): Promise<backendResponse<user, user>> {
  const { username, password } = user;

  if (password === undefined) return error(USER_ERROR.NO_PASSWORD, user);

  const dbResult = await dbFindOne<user>(usersCollection, { username });
  if (dbResult === null) return error(USER_ERROR.INVALID_USERNAME, user);
  if (dbResult?.passwordHash === undefined) return error(USER_ERROR.INVALID_DB_ENTRY, user);

  const isPasswordCorrect = await verifyPassword(password, dbResult.passwordHash);
  if (!isPasswordCorrect) return error(USER_ERROR.INCORRECT_PASSWORD, user);

  return result(dbResult, user);
}
