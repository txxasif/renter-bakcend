import { config } from '@renter/config';
import User from '@renter/models/user.schema';
import { IUser } from '@renter/types/User';
import { sign } from 'jsonwebtoken';
export async function getUserByEmail(email: string) {
  const user = await User.findOne({ email });
  return user;
}
export async function createAuthUser(user: IUser) {
  const newUser = new User({ ...user });
  await newUser.save();
  console.log(newUser, 'new');
  return newUser;
}

export function signToken(id: string, email: string): string {
  return sign(
    {
      id,
      email
    },
    config.JWT_TOKEN!
  );
}
