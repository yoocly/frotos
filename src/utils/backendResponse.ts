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

export function result<result, payload>(
  result: result,
  payload: payload,
  resultCode = 0,
  status = 200
): backendResponse<result, payload> {
  return { status, response: { resultCode, result, payload } };
}

export function error<result, payload>(
  error: error,
  payload: payload,
  status = 500
): backendResponse<result, payload> {
  return { status, response: { resultCode: error.code, error: error.description, payload } };
}
