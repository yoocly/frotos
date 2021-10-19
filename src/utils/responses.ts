import type { Response, Request } from 'express';
import type { User } from '../lib/types/user';

declare module 'express' {
  interface Request {
    auth?: User;
    forceLogin?: boolean;
  }
}

export type error = { resultCode: number; httpCode: number; description: string };
export type backendResponse<result, payload> = {
  resultCode: number;
  result?: result;
  error?: string;
  payload: payload;
  auth?: User;
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

export function error(req: Request, res: Response, error: error): void {
  res.status(error.httpCode).json({
    resultCode: error.resultCode,
    error: error.description,
    payload: req.body,
    auth: req?.auth,
    isLoggedIn: !!req?.auth,
    forceLogin: req?.forceLogin,
  } as backendResponse<unknown, unknown>);
}
