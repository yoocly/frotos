import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import type { VerifyErrors } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { dbFindOne, dbInsertOne } from '../../utils/database';
import { hashPassword, verifyPassword } from '../../utils/hashPassword';
import { error, result } from '../../utils/responses';
import type { user } from '../types/user';
dotenv.config();

export const USER_ERROR = {
  NO_JWT: { resultCode: 401, httpCode: 401, description: 'No jwt' },
  AUTH_FAILED: { resultCode: 403, httpCode: 403, description: 'Authentication failed' },
  USER_NOT_FOUND: { resultCode: 404, httpCode: 404, description: 'User not found' },
  NO_PASSWORD: { resultCode: 501, httpCode: 401, description: 'No password' },
  INVALID_USERNAME: { resultCode: 502, httpCode: 401, description: 'Invalid username' },
  INVALID_DB_ENTRY: { resultCode: 503, httpCode: 500, description: 'Invalid database entry' },
  INCORRECT_PASSWORD: { resultCode: 504, httpCode: 401, description: 'Incorrect password' },
  ADD_USER_FAILED: { resultCode: 505, httpCode: 503, description: 'Failed to add user' },
  LOAD_JWT_FAILED: { resultCode: 506, httpCode: 503, description: 'Failed to load jwt' },
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
  if (!user?.username) return error(req, res, USER_ERROR.INVALID_USERNAME);

  const { username } = user;
  const dbResponse = await dbFindOne<user>(usersCollection, { username });

  if (dbResponse === null) return error(req, res, USER_ERROR.USER_NOT_FOUND);
  return result(req, res, { userFound: true }, 1);
}

export async function addUser(req: Request, res: Response): Promise<void> {
  const user = req.body.user as user;
  if (!user?.username) return error(req, res, USER_ERROR.INVALID_USERNAME);
  if (!user?.password) return error(req, res, USER_ERROR.NO_PASSWORD);

  const userPasswordHashed = await hashUserPassword(user);

  const dbResult = await dbInsertOne(
    usersCollection,
    userPasswordHashed,
    (user: user) => user.password === undefined
  );
  if (dbResult === null) return error(req, res, USER_ERROR.ADD_USER_FAILED);
  return result(req, res, { ...dbResult }, 1, 201);
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const user = req.body.user as user;
  const { username, password } = user;
  if (password === undefined) return error(req, res, USER_ERROR.NO_PASSWORD);

  const dbResult = await dbFindOne<user>(usersCollection, { username });
  if (dbResult === null) return error(req, res, USER_ERROR.INVALID_USERNAME);
  if (dbResult?.passwordHash === undefined) return error(req, res, USER_ERROR.INVALID_DB_ENTRY);

  const isPasswordCorrect = await verifyPassword(password, dbResult.passwordHash);
  if (!isPasswordCorrect) return error(req, res, USER_ERROR.INCORRECT_PASSWORD);

  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret === undefined) return error(req, res, USER_ERROR.LOAD_JWT_FAILED);

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
    if (!accessToken && forceLogin) return error(req, res, USER_ERROR.NO_JWT);

    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret === undefined) return error(req, res, USER_ERROR.LOAD_JWT_FAILED);

    jwt.verify(accessToken, jwtSecret, <user>(err: VerifyErrors | null, user: user) => {
      if (err && forceLogin) return error(req, res, USER_ERROR.AUTH_FAILED);

      req.auth = user;
      req.forceLogin = forceLogin;
      next();
    });
  };
}
