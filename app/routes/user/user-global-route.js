"use strict";
import configApi from '../../../config/configApi.js';
import handleUploads from '../../middleware/fileUploadMiddleware.js';
import userSettingController from '../../src/controller/user/setting/userSettingController.js'
import userJobController from '../../src/controller/user/job/userJobController.js';
 import isUserMiddleware from '../../middleware/auth/isUserMiddleware.js';
import jobValidation from '../../middleware/validation/jobValidation.js';
import profileUpload  from  '../../middleware/profileUpload.js';
import singledocUpload  from  '../../middleware/singleDocupload.js';
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
import driverSettingController from '../../src/controller/driver/setting/driverSettingController.js';
const { apiPrefixUser } = configApi;
export default function setupGlobalRoutes(app) {
  //job
  app.post(`${apiPrefixUser}/create-job`, isUserMiddleware, handleUploads, userJobController.createJob );
  app.post(`${apiPrefixUser}/today/job`, isUserMiddleware, userJobController.todayJobList );
  app.post(`${apiPrefixUser}/upcoming/job`, isUserMiddleware, userJobController.upcomingJobList );
  app.post(`${apiPrefixUser}/past/job`, isUserMiddleware, userJobController.pastJob );
  app.post(`${apiPrefixUser}/unassign/job`, isUserMiddleware, userJobController.unassignJob );
  app.post(`${apiPrefixUser}/job/details`, isUserMiddleware, userJobController.getJobDetails );
  //setting
  app.post(`${apiPrefixUser}/edit/profile`, isUserMiddleware,singledocUpload,userSettingController.editUserProfile );
  app.post(`${apiPrefixUser}/update/photo`, isUserMiddleware, profileUpload, userSettingController.updatePhoto );
  app.post(`${apiPrefixUser}/add/contact`,  isUserMiddleware, userSettingController.addContact );
  app.post(`${apiPrefixUser}/contact/list`, isUserMiddleware, userSettingController.contactList );
  app.post(`${apiPrefixUser}/contact/findById`, isUserMiddleware, userSettingController.findContact );
  app.post(`${apiPrefixUser}/contact/update`, isUserMiddleware,RegistrationValidation.idCheck,  userSettingController.updateContact );
  app.post(`${apiPrefixUser}/contact/delete`, isUserMiddleware, userSettingController.deleteContact );
  app.post(`${apiPrefixUser}/contact-to/admin`, isUserMiddleware, userSettingController.contactToAdmin );
  app.post(`${apiPrefixUser}/vehicle/list`, isUserMiddleware, driverSettingController.vehichleList );

  //job cancellation api
  app.post(`${apiPrefixUser}/cancel/job`, isUserMiddleware, RegistrationValidation.cancelJobReq, userJobController.cancelJob);

}
 