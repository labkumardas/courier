"use strict";
import dotenv from 'dotenv';
dotenv.config();
const { MAIL_SERVICE, MAIL_USER, MAIL_PASSWORD, SENDER_MAIL  } = process.env;
export default {
  service: MAIL_SERVICE ,
  auth_user: MAIL_USER,
  auth_pass: MAIL_PASSWORD,
  senderMail: SENDER_MAIL
};