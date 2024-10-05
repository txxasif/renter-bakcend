import path from 'path';

import nodemailer, { Transporter } from 'nodemailer';
import Email from 'email-templates';
import { config } from '@renter/config';

async function emailTemplates(to: string): Promise<void> {
  console.log(config.SENDER_EMAIL);

  try {
    const smtpTransport: Transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.EMAIL_APP_PASSWORD
      }
    });
    const email: Email = new Email({
      message: {
        from: `Jobber App <${config.SENDER_EMAIL}>`
      },
      send: true,
      preview: false,
      transport: smtpTransport,
      views: {
        options: {
          extension: 'ejs'
        }
      },
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, '../build')
        }
      }
    });
    const data = { name: 'Asif' };
    await email.send({
      template: path.join(__dirname, '..', 'emails', 'custom'),
      message: { to: to },
      locals: data
    });
  } catch (error) {
    console.log(error);
  }
}

export { emailTemplates };
