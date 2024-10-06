import { compare, hash } from 'bcryptjs';
const SALT_ROUND = 10;

export async function hashPassword(password: string) {
  const hashedPassword: string = await hash(password, SALT_ROUND);
  return hashedPassword;
}
export async function comparePassword(password: string, hashPass: string): Promise<boolean> {
  return await compare(password, hashPass);
}
