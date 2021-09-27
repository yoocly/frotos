import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import type { VerifyErrors } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { dbFindOne, dbInsertOne } from '../../utils/database';
import { hashPassword, verifyPassword } from '../../utils/hashPassword';
import { error, result } from '../../utils/responses';
dotenv.config();

export type user = { username?: string; password?: string; passwordHash?: string };

export const USER_ERROR = {
  NO_JWT: { code: 401, description: 'No jwt' },
  AUTH_FAILED: { code: 403, description: 'Authentication failed' },
  USER_NOT_FOUND: { code: 404, description: 'User not found' },
  NO_PASSWORD: { code: 501, description: 'No password' },
  INVALID_USERNAME: { code: 502, description: 'Invalid username' },
  INVALID_DB_ENTRY: { code: 503, description: 'Invalid database entry' },
  INCORRECT_PASSWORD: { code: 504, description: 'Incorrect password' },
  ADD_USER_FAILED: { code: 505, description: 'Failed to add user' },
  LOAD_JWT_FAILED: { code: 506, description: 'Failed to load jwt' },
};

const usersCollection = 'users';
const jwtExpiration = '1h';
const cookieExpiration = 60 * 60 * 1000;

function removePassword(user: user): user {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function hashUserPassword(user: user): Promise<user> {
  const hash = user.password !== undefined ? await hashPassword(user.password) : undefined;
  return removePassword({ ...user, passwordHash: hash });
}

export function setJWT(res: Response, accessToken: string): void {
  res.cookie('auth', accessToken, { maxAge: cookieExpiration });
}

export async function checkUserExists(req: Request, res: Response): Promise<void> {
  const user = req.body.user as user;
  if (!user?.username) return error(req, res, USER_ERROR.INVALID_USERNAME, 400);

  const { username } = user;
  const dbResponse = await dbFindOne<user>(usersCollection, { username });

  if (dbResponse === null) return error(req, res, USER_ERROR.USER_NOT_FOUND, 404);
  return result(req, res, { userFound: true }, 1);
}

export async function addUser(req: Request, res: Response): Promise<void> {
  const user = req.body.user as user;
  if (!user?.username) return error(req, res, USER_ERROR.INVALID_USERNAME, 400);
  if (!user?.password) return error(req, res, USER_ERROR.NO_PASSWORD, 400);

  const userPasswordHashed = await hashUserPassword(user);

  const dbResult = await dbInsertOne(
    usersCollection,
    userPasswordHashed,
    (user: user) => user.password === undefined
  );
  if (dbResult === null) return error(req, res, USER_ERROR.ADD_USER_FAILED, 503);
  return result(req, res, { ...dbResult }, 1, 201);
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const user = req.body.user as user;
  const { username, password } = user;
  if (password === undefined) return error(req, res, USER_ERROR.NO_PASSWORD, 401);

  const dbResult = await dbFindOne<user>(usersCollection, { username });
  if (dbResult === null) return error(req, res, USER_ERROR.INVALID_USERNAME, 401);
  if (dbResult?.passwordHash === undefined)
    return error(req, res, USER_ERROR.INVALID_DB_ENTRY, 500);

  const isPasswordCorrect = await verifyPassword(password, dbResult.passwordHash);
  if (!isPasswordCorrect) return error(req, res, USER_ERROR.INCORRECT_PASSWORD, 401);

  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret === undefined) return error(req, res, USER_ERROR.LOAD_JWT_FAILED, 503);

  const accessToken = jwt.sign(removePassword(user), jwtSecret, { expiresIn: jwtExpiration });
  setJWT(res, accessToken);
  req.auth = user;

  result(req, res, { result: true }, 1);
}

export async function logoutUser(req: Request, res: Response): Promise<void> {
  res.clearCookie('auth');
  result(req, res, {}, 1, 204);
}

export function authenticate(forceLogin = true) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const accessToken = req.cookies.auth || '';
    if (!accessToken && forceLogin) return error(req, res, USER_ERROR.NO_JWT, 401);

    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret === undefined) return error(req, res, USER_ERROR.LOAD_JWT_FAILED, 500);

    jwt.verify(accessToken, jwtSecret, <user>(err: VerifyErrors | null, user: user) => {
      if (err && forceLogin) return error(req, res, USER_ERROR.AUTH_FAILED, 403);

      req.auth = user;
      req.forceLogin = forceLogin;
      next();
    });
  };
}
