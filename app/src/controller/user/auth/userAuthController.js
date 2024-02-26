"use strict";
import logger from 'morgan';
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import roleConstants from '../../../../util/roleConstants.js';
import ErrorLogger from '../../../../helper/errorLogHelper.js';

 const roleType = roleConstants.USER.slug;

class userAuthController {
  constructor() {
    this.authService = container.resolve('authService');
    this.userService = container.resolve('userService');
    this.generateToken = container.resolve('generateToken');
  }

  userAuth = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.authService.loginWithEmail(email, password, roleType);
      if (!user) {
        return sendErrorResponse(res, 'NO_USER_FOUND', 'Please enter the correct email Id');
      }
      if (user.status === 'INACTIVE') {
        return sendErrorResponse(res, 'USER_IS_NOT_ACTIVE');
      }
      if (user.status === 'WRONG_PASSWORD') {
         return sendErrorResponse(res, 'WRONG_PASSWORD',"Wrong Password");
      }
      if (user.status === 'LOGIN_FAILED') {
        return sendErrorResponse(res, 'NO_USER_FOUND', 'Please enter the correct email Id');
      }
      if (user.status === 'ACCOUNT_BLOCK') {
        return sendErrorResponse(res, 'ACCOUNT_BLOCK');
      }
      if (user.status === 'ACCOUNT_DELETE') {
        return sendErrorResponse(res, 'ACCOUNT_DELETE');
      }
       return sendSuccessResponse(res, 'OK', 'OTP sent to your email ID!.', user);
    } catch (error) {
      ErrorLogger.logError(error, 'userAuth Error');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error);
    }
  }

  verifyUserOtp = async (req, res) => {
    const { otp, email ,userId } = req.body;
    if (!otp) {
      return sendErrorResponse(res, 'OTP_IS_REQUIRED',"OTP IS REQUIRED!");
    }
    if (!email) {
      return sendErrorResponse(res, 'EMAIL_IS_REQUIRED',"EMAIL IS REQUIRED!");
    }
    if (!userId) {
      return sendErrorResponse(res, 'USERID_IS_REQUIRED',"USERID IS REQUIRED!");
    }
    try {
        const result = await this.authService.checkOtp(otp , email , userId);
        if (result.status === 'INVALID_OTP') {
          return sendErrorResponse(res, 'INVALID_OTP',"WRONG OTP!");
        }
       else if (result.status == 'OTP_is_expired') {
          return sendErrorResponse(res, 'OTP_is_expired',"OTP Is Expired" );
        }
        else{
          const userToken = await this.generateToken.createToken(result, roleType);
          await this.authService.saveLoginHistory(userToken);
          return sendSuccessResponse(res, 'OK', 'Login successful.',userToken );
        }
    
    } catch (error) {
      console.log(error);
      ErrorLogger.logError(error, 'verifyUserOtp Error');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  getUserProfile= async (req, res) => {
    try {
      const result = await this.authService.Profile(req);
      return sendSuccessResponse(res, 'OK', 'Success.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'getUserProfile Error');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);

    }
  }
   
  resendOtp = async (req,res)=>{
    const {  email ,userId } = req.body;
    try {
        const result = await this.authService.otpResend( email , userId , roleType);
        return sendSuccessResponse(res, 'OK', 'OTP sent to your email ID!.', result);
      } catch (error) {
        ErrorLogger.logError(error, 'resendOtp Error');            
        return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
   
  userLogOut = async (req, res) => {
    const userId = req.body.user_id;
    const authHeader = req.headers.authorization;
    try {
      await this.authService.logOut(userId, authHeader);
      return sendSuccessResponse(res, 'OK', 'Logout Success');
    } catch (error) {
      ErrorLogger.logError(error, 'userLogOut Error');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

}
export default new userAuthController();
