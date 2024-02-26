"use strict";
import configApi from '../../../config/configApi.js';
import authDriverController from '../../src/controller/driver/auth/authDriverController.js';
import isDriverMiddleware from '../../middleware/auth/isDriverMiddleware.js';
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
import urlTokenMiddleware from '../../middleware/auth/urlTokenMiddleware.js';
const { apiPrefix } = configApi;
export default function setupAuthRoutes(app) {
    app.post(`${apiPrefix}/login`,RegistrationValidation.userLoginValidation,authDriverController.driverAuth);
    app.post(`${apiPrefix}/verify/otp`,RegistrationValidation.checkOtp,authDriverController.verifyOtp);
    app.post(`${apiPrefix}/resend/otp`,RegistrationValidation.verifyOtp,authDriverController.resendOtp);
    app.post(`${apiPrefix}/profile`, isDriverMiddleware, authDriverController.getDriverProfile);
    app.post(`${apiPrefix}/logout`, isDriverMiddleware, authDriverController.driverLogOut);
    app.post(`${apiPrefix}/forgot-password`, authDriverController.forgotPassword);
    app.post(`${apiPrefix}/update-password`, isDriverMiddleware,  authDriverController.updatePassword);
    app.post(`${apiPrefix}/delete/account`, isDriverMiddleware, authDriverController.deleteAccount);
    app.post(`${apiPrefix}/logout`, isDriverMiddleware, authDriverController.logOut);
}
 