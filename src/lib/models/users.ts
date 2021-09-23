import { hashPassword } from '../../utils/hashPassword';

export type user = { username: string; password?: string; passwordHash?: string };

export async function hashUserPassword(user: user): Promise<user> {
  const hash = user.password !== undefined ? await hashPassword(user.password) : undefined;
  const userPasswordHashed = { ...user, passwordHash: hash, password: undefined };
  const { password, ...userWithoutPassword } = userPasswordHashed;
  return userWithoutPassword;
}
