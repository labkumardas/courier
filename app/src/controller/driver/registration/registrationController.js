"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import ErrorLogger from '../../../../helper/errorLogHelper.js';

class registrationController {
  constructor() {
    this.driverService = container.resolve('driverService');
  }
  driveDataCreate = async (req, res) => {
    try {
      const userImage = req.document;
      const result = await this.driverService.createDriver(req.body, userImage);
    if (result.status === 'PHONE_EXIST') {
      return sendErrorResponse(res, 'EXISTING_PHONE_NUMBER');
    }
    if (result.status === 'EMAIL_EXIST') {
      return sendErrorResponse(res, 'EXISTING_EMAIL');
    }
    if (result.status === 'LOGIN_FAILED') {
       return sendErrorResponse(res, 'NO_USER_FOUND', 'No User Found!');
    }
    return sendSuccessResponse(res, 'CREATED', 'Driver Registration Success.', result);
    } catch (error) {
       ErrorLogger.logError(error, 'driveDataCreate Error');            

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
}

export default new registrationController();
