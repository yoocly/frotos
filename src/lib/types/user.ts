export type User = {
  _id?: string;
  username?: string;
  password?: string;
  passwordHash?: string;
  exp?: number;
  iat?: number;
};
