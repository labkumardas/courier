"use strict";
import configApi from '../../../config/configApi.js';
import singledocUpload from '../../middleware/singleDocupload.js';  
import registrationController from '../../src/controller/driver/registration/registrationController.js';
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
///RegistrationValidation.registrationStep1 ,
const { apiPrefix } = configApi;
export default function setupRegistrationRoutes(app) {
  app.post(`${apiPrefix}/register`, singledocUpload , registrationController.driveDataCreate );
}
