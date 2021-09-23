import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(addPepper(password), {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    parallelism: 2,
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  console.log(addPepper(password));
  return await argon2.verify(hash, addPepper(password));
}

function addPepper(password: string): string {
  return `${process.env.HASH_PEPPER}${password}`;
}
