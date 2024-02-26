import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import ErrorLogger from '../../../../helper/errorLogHelper.js';  
 
class userSettingController {
  constructor() {
    this.settingService = container.resolve('settingService');
  }

  editProfile = async (req, res) => {
    const userId = req.user.userId;
    const userImage = req.document;
    try {
      const result = await this.settingService.profileEdit(req.body, userId, userImage);

      return sendSuccessResponse(res, 'OK', 'Profile Update Successful.', result);
    } catch (error) {
       ErrorLogger.logError(error, 'editProfile');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  };

  editUserProfile = async (req, res) => {
    const userId = req.user.userId;
    const userImage = req.document;
    try {
      const result = await this.settingService.profileEditUser(req.body, userId, userImage);
      return sendSuccessResponse(res, 'OK', 'Profile Update Successful.', result);
    } catch (error) {
        return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  };

  addContact = async (req, res) => {
    try {
      const userId = req.user.userId;
      const result = await this.settingService.contactInsert(req.body, userId);
      return sendSuccessResponse(res, 'CREATED', 'Contact Create Successful.', result);
    } catch (error) {
       ErrorLogger.logError(error, 'addContact');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  contactList = async (req, res) => {
    try {
      const userId = req.user.userId;
      const result = await this.settingService.getAllContact(userId);
      return sendSuccessResponse(res, 'OK', 'success!.', result);
    } catch (error) {
       ErrorLogger.logError(error, 'editProfile');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  findContact = async (req, res) => {
    try {
      const id = req.body.id;
      const result = await this.settingService.getContactById(id);
      return sendSuccessResponse(res, 'Ok', 'success!.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'editProfile');
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
      return sendSuccessResponse(res, 'OK', 'Update Successfully', data1);
    } catch (error) {
       ErrorLogger.logError(error, 'updateContact');

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  updatePhoto = async (req, res) => {
    try {
      const id = req.user.userId;
      const imagePath = req.profileimage;
      const result = await this.settingService.updateprofileImageById(id, imagePath);
      return sendSuccessResponse(res, 'OK', 'Image upload completed!.', result);
    } catch (error) {
      ErrorLogger.logError(error, 'editProfile');
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
      ErrorLogger.logError(error, 'editProfile');      
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  contactToAdmin = async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.userId;
      const result = await this.settingService.adminContact(title, description, userId);
      return sendSuccessResponse(res, 'OK', 'success!.', result);

    } catch (error) {
      ErrorLogger.logError(error, 'editProfile');
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }



}
export default new userSettingController();
