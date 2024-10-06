import { signupSchema } from '@renter/schemes/signup';
import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { UploadApiResponse } from 'cloudinary';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@renter/types/error';
import { createAuthUser, getUserByEmail, signToken } from '@renter/services/auth.service';
import { IUser } from '@renter/types/User';
import { uploads } from '@renter/helper/cloudinary-upload';
import { lowerCase } from '@renter/helper/helpers';
import { hashPassword } from '@renter/helper/password-helper';
import { omit } from 'lodash';

export async function create(req: Request, res: Response): Promise<void> {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newData = omit(req.body, 'profilePicture');
  console.log(newData);

  const { error } = await Promise.resolve(signupSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'SignUp create() method error');
  }
  const { email, password, profilePicture, firstName, lastName, phoneNumber } = req.body as IUser;
  const checkIfUserExist: IUser | undefined = await getUserByEmail(email!);
  if (checkIfUserExist) {
    throw new BadRequestError('Invalid credentials. Email or Username', 'SignUp create() method error');
  }

  const profilePublicId = uuidV4();
  const uploadResult: UploadApiResponse = (await uploads(profilePicture!, `${profilePublicId}`, true, true)) as UploadApiResponse;
  if (!uploadResult.public_id) {
    throw new BadRequestError('File upload error. Try again', 'SignUp create() method error');
  }
  const hashPass = await hashPassword(password!);
  console.log(hashPass, 'hash');

  const authData: IUser = {
    email: lowerCase(email!),
    profilePublicId,
    password: hashPass,
    profilePicture: uploadResult?.secure_url,
    firstName,
    lastName,
    phoneNumber
  } as IUser;
  console.log(authData);

  const result: IUser = (await createAuthUser(authData)) as IUser;

  const userJWT: string = signToken(result._id!, result.email!);
  req.session = { jwt: userJWT };
  res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: result });
}
