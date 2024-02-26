"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import roleConstants from '../../../../util/roleConstants.js';
import ErrorLogger from '../../../../helper/errorLogHelper.js';

const roleType = roleConstants.DRIVER.slug;
  
class authController {
  constructor() {
    this.authService = container.resolve('authService');
    this.driverService = container.resolve('driverService');
    this.generateToken = container.resolve('generateToken');
  }
  //login with username and password
  driverAuth = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.authService.loginWithEmail(email, password, roleType);
      if (!user) {
        return sendErrorResponse(res, 'NO_USER_FOUND', 'Please enter the correct email Id');
      }
      if (user.status == 'WRONG_PASSWORD') {
        return sendErrorResponse(res, 'WRONG_PASSWORD', 'Wrong Password');
      }
      if (user.status === 'INACTIVE') {
        return sendErrorResponse(res, 'USER_IS_NOT_ACTIVE');
      }
      if (user.status === 'ACCOUNT_BLOCK') {
        return sendErrorResponse(res, 'ACCOUNT_BLOCK');
      }
      if (user.status === 'ACCOUNT_DELETE') {
        return sendErrorResponse(res, 'ACCOUNT_DELETE');
      }
       if (user.status === 'LOGIN_FAILED') {
        return sendErrorResponse(res, 'NO_USER_FOUND', 'Please enter the correct email Id');
      }
      return sendSuccessResponse(res, 'OK', 'OTP sent to your email ID!.', user);
    } catch (error) {
       ErrorLogger.logError(error, 'driverAuth');            

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  verifyOtp = async (req, res) => {
    const { otp, email, userId } = req.body;
    if (!otp) {
      return sendErrorResponse(res, 'OTP_IS_REQUIRED', "OTP IS REQUIRED!");
    }
    if (!email) {
      return sendErrorResponse(res, 'EMAIL_IS_REQUIRED', "EMAIL IS REQUIRED!");
    }
    if (!userId) {
      return sendErrorResponse(res, 'USERID_IS_REQUIRED', "USERID IS REQUIRED!");
    }
    try {
      const result = await this.authService.checkOtp(otp, email, userId);
       if (result.status === 'INVALID_OTP') {
        return sendErrorResponse(res, 'INVALID_OTP', "WRONG OTP!");
      }
      else if (result.status == 'OTP_is_expired') {
        return sendErrorResponse(res, 'OTP_is_expired', "OTP Is Expired");
      }
      else {
        const userToken = await this.generateToken.createToken(result, roleType);
        await this.authService.saveLoginHistory(userToken);
        return sendSuccessResponse(res, 'OK', 'Login successful.', userToken);
      }

    } catch (error) {
      ErrorLogger.logError(error, 'verifyOtp');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  resendOtp = async (req, res) => {
    const { email, userId } = req.body;
    try {
      const result = await this.authService.otpResend(email, userId, roleType);
      return sendSuccessResponse(res, 'OK', 'OTP sent to your email ID!.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'resendOtp');            
       return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  //get driver profile
  getDriverProfile = async (req, res) => {
    try {
      const result = await this.driverService.Profile(req);
      return sendSuccessResponse(res, 'OK', 'Success.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'getDriverProfile');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  //for logout 
  driverLogOut = async (req, res) => {
    const userId = req.body.user_id;
    const authHeader = req.headers.authorization;
    try {
      await this.authService.logOut(userId, authHeader);
      return sendSuccessResponse(res, 'OK', 'Logout Success');
    } catch (error) {
       ErrorLogger.logError(error, 'driverLogOut');            

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  //
  forgotPassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
      return sendErrorResponse(res, 'EMAIL_REQUIRED', "Email Id Rrquired");
    }
    try {
      const sendLink = await this.authService.forgotPasswordService(email);
      if (sendLink.status == "email_id_not_exist") {
        return sendErrorResponse(res, 'INVALID_EMAIL', 'INVALID_EMAIL');
      }
      return sendSuccessResponse(res, 'OK', 'Password reset link sent successfully. Please check your email for further instructions.', sendLink);
    } catch (error) {
       ErrorLogger.logError(error, 'forgotPassword');            

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  //
  updatePassword = async (req, res) => {
    const email = req.body.email;
    const password = req.body.old_password;
    const newPassword = req.body.new_password;
    if (!email) {
      return sendErrorResponse(res, 'EMAIL_REQUIRED', "Email Id Rrquired");
    }
    if (!password) {
      return sendErrorResponse(res, 'PASSWORD_REQUIRED', "Old Password Is Rrquired");
    }
    if (!newPassword) {
      return sendErrorResponse(res, 'PASSWORD_REQUIRED', "New Password Is Rrquired");
    }
    try {
      const result = await this.authService.updatePassword(email, password, newPassword);
      if (result.status == "no_user_found") {
        return sendSuccessResponse(res, 'NO_USER_FOUND', 'NO_USER_FOUND');
      }
      if (result.status == "old_password_does_not_match") {
        return sendSuccessResponse(res, 'PASSWORD_REQUIRED', 'old_password_does_not_match');
      }
      if (result.status == "invalid_email") {
        return sendSuccessResponse(res, 'INVALID_EMAIL', 'invalid_email');
      }
      return sendSuccessResponse(res, 'OK', 'Password reset successfully., sendLink');
    } catch (error) {
       ErrorLogger.logError(error, 'updatePassword');            

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  deleteAccount = async (req, res) => {
    const id = req.body.id;
    console.log(id);
    if (!id) {
      return sendErrorResponse(res, 'BAD_REQUEST', "Id Required");
    }
    try {
      const result = await this.authService.deleteUserAccount(id);
      if (result.status == "no_user_found") {
        return sendSuccessResponse(res, 'NO_USER_FOUND', 'NO_USER_FOUND');
      }
      return sendSuccessResponse(res, 'OK', 'Account Delete successfully.');
    } catch (error) {
       ErrorLogger.logError(error, 'deleteAccount');            

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  //
  logOut = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.substring(7);
    const userId = req.user.userId;

    if (!authHeader) {
      return sendErrorResponse(res, 'BAD_REQUEST', "token Is Rrquired");
    }
    try {
        await this.authService.logoutUser(userId, token);
      return sendSuccessResponse(res, 'OK', 'Log Out Successfully');
    } catch (error) {
       ErrorLogger.logError(error, 'logOut Error');            
       return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

}
export default new authController();
