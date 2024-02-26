"use strict";
import moment from 'moment';
import authRepository from '../repository/authRepository.js';
import userRepository from '../repository/userRepository.js';
import driverRepository from '../repository/driverRepository.js';
import mailServiceHelper from '../../helper/mailServiceHelper.js';
import globalHelper from '../../helper/globalHelper.js';
import generateToken from '../../helper/generateToken.js';
import bcrypt from 'bcryptjs';


const mailServiceHelperInstance = new mailServiceHelper();

class authService {
  constructor() {
    this.helper = new globalHelper();
    this.TokenHelper = generateToken; 
    }

  async loginWithEmail(email, password, type) {
    try {
      const userEmail = email.toLowerCase();
      const getData = await authRepository.userLogin(userEmail, password, type);
       if (getData.status == true) {
        const otp = await this.helper.generateOTP();
        await mailServiceHelperInstance.sendMailWithOTP(userEmail, 'Login OTP', otp);
        await authRepository.saveOtp(otp, userEmail, getData.userId);
        return {
          status: 'OTP_SENT',
          ...getData,
          otp: otp,
        };
      } else {
        return  getData ;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async checkOtp(otp, emailData, userId) {
    const email = emailData.toLowerCase();
    try {
      const isOtpVerified = await authRepository.verifyOtp(otp, email, userId);
       if(isOtpVerified.status == "OTP_is_expired" ){
        return {
          status: 'OTP_is_expired',
          message: 'OTP Is Expired',
        };
       }
       else if ( isOtpVerified.status == "INVALID_OTP" ){
        return {
          status: 'INVALID_OTP',
          message: 'INVALID OTP',
        };
       }
      else  {
        const user = {
          userId: userId,
          email: email,
        };
       return user;
      }  
    } catch (error) {
       throw new Error(error);
    }
  }
  
  async otpResend(emailData , userId , roleType) {
    const email = emailData.toLowerCase();
    try {
      const getData={
        email , userId
      }
       const otp = await this.helper.generateOTP();
        await mailServiceHelperInstance.sendMailWithOTP(email, 'Login OTP', otp);
        await authRepository.saveOtp(otp, email, userId);
        return {
          status: 'OTP_SENT',
          ...getData,
          otp: otp,
        };
      }  
     catch (error) {
      throw new Error(error);
    }
  }

  async saveLoginHistory(data) {
    try {
      const userData = {
        user_id: data.user.userId,
        userToken: data.accessToken,
        deviceType: null,
        deviceId: null,
        isActive: true,
        isBlacklist: false,
        lastLogin: moment().format('DD-MM-YYYY hh:mm:ss A'),
      }
      return await authRepository.createLoginHistory(userData);
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async logOut(userId, authHeader) {
    const token = authHeader.substring(7);
    const newData = {
      isActive: false,
      isBlacklist: true,
    }
    try {
      return await authRepository.updateLoginHistory(userId, token, newData);
     }
    catch (error) {
      throw new Error(error)
    }
  }

  async checkBlackListToken(authHeader) {
    const token = authHeader.substring(7);
    try {
      return await authRepository.checkToken(token);
    }
    catch (error) {
      throw new Error(error)
    }
  }
  
  async Profile(req) {
    try {
        return await driverRepository.findUserById(req.user.userId);
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
  }

  async forgotPasswordService(emailData) {
    const email = emailData.toLowerCase();
    try {
      const emailCount = await userRepository.findByEmail(email);
      console.log(emailCount);
      if(!emailCount ){
       return {
         status: 'email_id_not_exist' 
       };
      }
      const accessToken = await  this.TokenHelper.mailToken(email);
      const resetLink = `http://kindra.developmentrecords.com/reset-password?token=${accessToken}&email=${email}`;
      const subject = 'Forgot Password - Reset Link';
      const html = `
          <p>To reset your password, click on the following link:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
      `;
      await mailServiceHelperInstance.sendMail(email, subject, null, html);
      return { status: 'Email_sent_successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to initiate password reset process');
    }
  }

  async updatePassword(emailData,password,newPassword) {
    const email = emailData.toLowerCase();
    try {
      const checkEmail = await userRepository.findUserEmail(email);
      if(!checkEmail){
          return {status :"invalid_email"}
      }
      const isPasswordMatch = bcrypt.compareSync(password, checkEmail.password);
   
    if (!isPasswordMatch) {
      return {status :"old_password_does_not_match"}
     }
      const newPass = bcrypt.hashSync(newPassword, 8);
      return await  authRepository.updatePassword(email,newPass);
     } catch (error) {
      console.error(error);
      throw new Error('Failed to initiate updatePassword process');
    }
  }

  async deleteUserAccount (id){
    try {
     
      const result = await  authRepository.userDelete(id);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async logoutUser (userId ,token){ 
    try {
      const newData={
        isBlacklist:true,
        isActive:false
      }
      return await authRepository.blackListToken(userId ,token,newData);
    } catch (error) {
      throw new Error(error);
    }
  }
  

}

export default new authService();