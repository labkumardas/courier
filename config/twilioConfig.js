"use strict";
import dotenv from 'dotenv';
dotenv.config();
const { twilioAccountSid, twilioAuthToken, twilioPhoneNumber } = process.env;
export default {
    twilioAccountSid : twilioAccountSid,
    twilioAuthToken : twilioAuthToken,
    twilioPhoneNumber : twilioPhoneNumber
};