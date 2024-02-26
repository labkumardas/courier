"use strict";
import configApi from '../../../config/configApi.js';
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
import registrationController from '../../src/controller/user/registration/userRegistrationController.js';
///RegistrationValidation.registrationStep1 ,
const { apiPrefixUser } = configApi;
export default function setupRegistrationRoutes(app) {
  app.post(`${apiPrefixUser}/registration`,RegistrationValidation.phoneNumberValidation, registrationController.userDataCreate );
}
