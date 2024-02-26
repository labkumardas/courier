"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import logger from 'morgan';
import ErrorLogger from '../../../../helper/errorLogHelper.js';
 
class registrationController {
    constructor() {
        this.userService = container.resolve('userService');
    }
    userDataCreate = async (req, res) => {
        try {
            const result = await this.userService.createUser(req.body);
            if (result.status === 'PHONE_EXIST') {
                return sendErrorResponse(res, 'EXISTING_PHONE_NUMBER');
            }
            if (result.status === 'EMAIL_EXIST') {
                return sendErrorResponse(res, 'EXISTING_EMAIL');
            }
            if (result.status === 'LOGIN_FAILED') {
                return sendErrorResponse(res, 'NO_USER_FOUND', 'No User Found!');
            }
            return sendSuccessResponse(res, 'CREATED', 'registration successful.', result);
        } catch (error) {
            ErrorLogger.logError(error, 'userDataCreate');            
            return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
        }
    }
}

export default new registrationController();
