"use strict";
import configApi from '../../../config/configApi.js';
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
import userAuthController from '../../src/controller/user/auth/userAuthController.js';
import isUserMiddleware from '../../middleware/auth/isUserMiddleware.js';
import authDriverController from '../../src/controller/driver/auth/authDriverController.js';
import urlTokenMiddleware from '../../middleware/auth/urlTokenMiddleware.js';
//
const { apiPrefixUser } = configApi;
export default function setupAuthRoutes(app) {
    app.post(`${apiPrefixUser}/login`, RegistrationValidation.userLoginValidation,userAuthController.userAuth);
    app.post(`${apiPrefixUser}/verify/otp`, RegistrationValidation.checkOtp,userAuthController.verifyUserOtp);
    app.post(`${apiPrefixUser}/profile`, isUserMiddleware, userAuthController.getUserProfile);
    app.post(`${apiPrefixUser}/resend/otp`, RegistrationValidation.verifyOtp,userAuthController.resendOtp);
    app.post(`${apiPrefixUser}/resend/otp`, RegistrationValidation.verifyOtp,userAuthController.resendOtp);
    app.post(`${apiPrefixUser}/forgot-password`, authDriverController.forgotPassword);
    app.post(`${apiPrefixUser}/update-password`, isUserMiddleware, authDriverController.updatePassword);
    app.post(`${apiPrefixUser}/delete/account`, isUserMiddleware, authDriverController.deleteAccount);
    app.post(`${apiPrefixUser}/logout`, isUserMiddleware, authDriverController.logOut);

}
 