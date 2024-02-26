"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import logger from 'morgan';

class GlobalController {
  constructor() {
    this.roleService = container.resolve('roleService');
    this.driverJobService= container.resolve('driverJobService');

  }

  viewRole = async (req, res) => {
    try {
      const result = await this.roleService.viewRoleList(req.body);
      return sendSuccessResponse(res, 'OK', result);
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR');
    }
  }

  createBill = async(req,res)=>{
    const { job_id , amount ,additional_amount } = req.body;
    const userId = req.user.userId;
    try {
      const result = await this.driverJobService.billInsert( job_id , amount ,additional_amount,userId );
      return sendSuccessResponse(res,'OK', 'success!', result );
    } catch (error) {
      logger.error(`createBill Error: ${error}`);
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

}
export default new GlobalController();
