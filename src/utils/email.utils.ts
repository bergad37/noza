import nodemailer from 'nodemailer';
import { isNil } from 'lodash';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NZ_EMAIL,
    pass: process.env.NZ_PASSWORD
  }
});

export async function sendEmail(
  to: string | string[],
  data: NZ.IEmailData
): Promise<boolean> {
  if (isNil(data.bodyMessage)) {
    console.log('Could not find email body');
    return Promise.resolve(false);
  }

  const options = {
    from: process.env.CVL_EMAIL,
    to,
    subject: data.subject,
    html: data.bodyMessage
  };

  return new Promise((resolve) => {
    transporter.sendMail(options, (error: any, info: any) => {
      if (error) {
        console.error(`couldn't send mail ${error}`);
      } else {
        console.info(`Message sent: ${JSON.stringify(info)}`);
      }
      resolve(true);
    });
  });
}
