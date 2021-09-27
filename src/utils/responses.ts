import type { Response, Request } from 'express';
import type { user } from '../lib/models/user';

declare module 'express' {
  interface Request {
    auth?: user;
    forceLogin?: boolean;
  }
}

export type error = { code: number; description: string };
export type backendResponse<result, payload> = {
  status: number;
  response: {
    resultCode: number;
    result?: result;
    error?: string;
    payload: payload;
  };
};

export function resultOld<result, payload>(
  result: result,
  payload: payload,
  resultCode = 0,
  status = 200
): backendResponse<result, payload> {
  return { status, response: { resultCode, result, payload } };
}

export function errorOld<result, payload>(
  error: error,
  payload: payload,
  status = 500
): backendResponse<result, payload> {
  return { status, response: { resultCode: error.code, error: error.description, payload } };
}

export function result<result>(
  req: Request,
  res: Response,
  result: result,
  resultCode = 0,
  status = 200
): void {
  res.status(status).json({
    resultCode,
    result,
    payload: req.body,
    auth: req?.auth,
    isLoggedIn: !!req?.auth,
    forceLogin: req?.forceLogin,
  });
}

export function error(req: Request, res: Response, error: error, status = 500): void {
  res.status(status).json({ resultCode: error.code, error: error.description, payload: req.body });
}
