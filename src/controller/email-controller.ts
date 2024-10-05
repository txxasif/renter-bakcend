import { sendEmail } from '@renter/helper/mail.transport';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const sendEmailController = async (_req: Request, res: Response): Promise<void> => {
  await sendEmail('ahasiffff@gmail.com');
  res.status(StatusCodes.OK).json({ message: 'Email sent successfully.' });
};

export { sendEmailController };
