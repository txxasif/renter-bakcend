import { emailTemplates } from '@renter/helper/email-helper';

async function sendEmail(to: string): Promise<void> {
  try {
    emailTemplates(to);
    console.log('Email sent successfully.');
  } catch (error) {
    console.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
  }
}

export { sendEmail };
