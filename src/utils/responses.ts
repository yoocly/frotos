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
  resultCode: number;
  result?: result;
  error?: string;
  payload: payload;
  auth?: user;
  isLoggedIn?: boolean;
  forceLogin?: boolean;
};

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
  } as backendResponse<result, unknown>);
}

export function error(req: Request, res: Response, error: error, status = 500): void {
  res.status(status).json({
    resultCode: error.code,
    error: error.description,
    payload: req.body,
    auth: req?.auth,
    isLoggedIn: !!req?.auth,
    forceLogin: req?.forceLogin,
  } as backendResponse<string, unknown>);
}
