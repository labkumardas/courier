"use strict";
import configApi from '../../../config/configApi.js';
import verifyTokenMiddleware from '../../middleware/auth/isDriverMiddleware.js';
import driverSettingController from '../../src/controller/driver/setting/driverSettingController.js';
import isDriverMiddleware from '../../middleware/auth/isDriverMiddleware.js';
import profileUpload  from  '../../middleware/profileUpload.js';
import settingController from '../../src/controller/user/setting/userSettingController.js';
import singledocUpload  from  '../../middleware/singleDocupload.js';
import driverJobController from '../../src/controller/driver/job/driverJobController.js';
import handleUploads from '../../middleware/fileUploadMiddleware.js';  // Import handleUploads first
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
import globalController from '../../src/controller/driver/global/globalController.js';
 //all routes
const { apiPrefix } = configApi;
export default function setupGlobalRoutes(app) {
    app.post(`${apiPrefix}/edit/profile`,  isDriverMiddleware,  singledocUpload, driverSettingController.editProfile );
    app.post(`${apiPrefix}/add/contact`, isDriverMiddleware, driverSettingController.addContact );
    app.post(`${apiPrefix}/contact/list`, isDriverMiddleware, driverSettingController.contactList );
    app.post(`${apiPrefix}/contact/findById`, isDriverMiddleware, driverSettingController.findContact );
    app.post(`${apiPrefix}/contact/update`, isDriverMiddleware,RegistrationValidation.idCheck, driverSettingController.updateContact );
    app.post(`${apiPrefix}/contact/delete`, isDriverMiddleware, RegistrationValidation.idCheck,driverSettingController.deleteContact );
    app.post(`${apiPrefix}/update/photo`, isDriverMiddleware, profileUpload , settingController.updatePhoto  );
    //create job
    app.post(`${apiPrefix}/create-job`, isDriverMiddleware, handleUploads, driverJobController.createJob );
    //////out-job
    app.post(`${apiPrefix}/out-job/myjob`, isDriverMiddleware, driverJobController.myOutJob );
    app.post(`${apiPrefix}/out-job/past`, isDriverMiddleware, driverJobController.OutJobPast );
    app.post(`${apiPrefix}/out-job/unassigned`, isDriverMiddleware, driverJobController.unAssignedOutJob );
    /////in-job
    app.post(`${apiPrefix}/in-job/myjob`, isDriverMiddleware, driverJobController.myInJob );
    app.post(`${apiPrefix}/in-job/past`, isDriverMiddleware, driverJobController.inJobPast );
    app.post(`${apiPrefix}/in-job/jobrequest`, isDriverMiddleware, driverJobController.requestInJob );
    app.post(`${apiPrefix}/accept/job`, isDriverMiddleware,RegistrationValidation.acceptJobVal, driverJobController.acceptJob );

   //Setting
   app.post(`${apiPrefix}/contact-to/admin`, isDriverMiddleware, settingController.contactToAdmin );
   //bill
   app.post(`${apiPrefix}/create/bill`, isDriverMiddleware, globalController.createBill );
   app.post(`${apiPrefix}/vehicle/list`, isDriverMiddleware, driverSettingController.vehichleList );

   
   
}
