import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import ErrorLogger from '../../../../helper/errorLogHelper.js';

class driverSettingController {

  constructor() {
    this.settingService = container.resolve('settingService');
  }

  editProfile = async (req, res) => {
    const userId = req.user.userId;
    const driverDocument = req.document
    if(!userId){
      return sendErrorResponse(res, 'BAD_REQUEST','PLEASE SEND VALIDE TOKEN');
    }
    try {
      const result = await this.settingService.profileEdit(req.body, userId, driverDocument);
      if (result.status === 'PHONE_EXIST') {
        return sendErrorResponse(res, 'EXISTING_PHONE_NUMBER');
      }
      if (result.status === 'EMAIL_EXIST') {
        return sendErrorResponse(res, 'EXISTING_EMAIL');
      }
      return sendSuccessResponse(res, 'OK', 'Profile Update Successful.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'editProfile Error');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  };

  addContact = async (req, res) => {
    try {
      const userId = req.user.userId;
      const result = await this.settingService.contactInsert(req.body, userId);
      return sendSuccessResponse(res, 'CREATED', 'Contact Create Successful.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'addContact Error');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  contactList = async (req, res) => {
    try {
      const userId = req.user.userId;
      const result = await this.settingService.getAllContact(userId);
      return sendSuccessResponse(res, 'OK', 'success!.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'contactList Error');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  findContact = async (req, res) => {
    try {
      const id = req.body.id;
      const result = await this.settingService.getContactById(id);
      return sendSuccessResponse(res, 'Ok', 'success!.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'findContact Error');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  updateContact = async (req, res) => {
    try {
      const id = req.body.id;
      const data = req.body;
      await this.settingService.updateContactById(id, data);
      const data1 = {
        _id: data.id,
        name: data.name,
        location: data.location,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code

      }
      return sendSuccessResponse(res, 'OK', 'success!.', data1);
    } catch (error) {
      ErrorLogger.logError(error, 'updateContact Error');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  deleteContact = async (req, res) => {
    try {
      const id = req.body.id;
      const result = await this.settingService.deleteContactById(id);
      if (result.status == "invalid_id") {
        return sendErrorResponse(res, 'NOT_FOUND', "Invalid Id");
      }
      return sendSuccessResponse(res, 'OK', 'success!.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'deleteContact Error');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  vehichleList= async (req, res) => {
    try {
      const result = await this.settingService.vehichleData();
      return sendSuccessResponse(res, 'OK', 'success', result);
    } catch (error) {
      ErrorLogger.logError(error, 'deleteContact Error');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

}
export default new driverSettingController();
