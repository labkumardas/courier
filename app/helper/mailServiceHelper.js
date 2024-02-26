"use strict";
import mailConfig from '../../config/mail.config.js';
import nodemailer from  'nodemailer';

class mailServiceHelper {
  constructor() {
    // Create a transporter using SMTP
    this.transporter = nodemailer.createTransport({
      service: mailConfig.service,
      auth: {
        user: mailConfig.auth_user,
        pass: mailConfig.auth_pass,
      },
    });
  }

  async sendMail(to, subject, text ,html) {
    // Define email options
    const mailOptions = {
      from: mailConfig.senderMail,
      to,
      subject,
      text,
      html
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendMailWithOTP(to, subject, otp) {
    const mailOptions = {
      from: mailConfig.senderMail,
      to,
      subject,
      text: `Your OTP is: ${otp}`, // Include the OTP in the email content
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:' );
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send Otp in mail');
    }
  }

}
export default mailServiceHelper;