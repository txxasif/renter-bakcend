import { loginSchema } from '@renter/schemes/signin';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { omit } from 'lodash';
import { IUser } from '@renter/types/User';
import { getUserByEmail, signToken } from '@renter/services/auth.service';
import { BadRequestError } from '@renter/types/error';
import { comparePassword } from '@renter/helper/password-helper';

export async function read(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(loginSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'SignIn read() method error');
  }
  const { email, password } = req.body;
  const existingUser: IUser | undefined = await getUserByEmail(email);
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials', 'SignIn read() method error');
  }
  const passwordsMatch: boolean = await comparePassword(password, existingUser.password!);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials', 'SignIn read() method error');
  }
  let userJWT = '';
  let userData: IUser | null = null;
  const message = 'Logged in successfully';

  userJWT = signToken(existingUser._id!, existingUser.email!);
  userData = omit(existingUser, ['password']);

  req.session = { jwt: userJWT };
  res.status(StatusCodes.OK).json({ message, user: userData });
}
