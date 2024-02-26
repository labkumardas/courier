"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import typeConstants from '../../../../util/typeConstants.js';
import logger from 'morgan';

class driverJobController {
  constructor() {
    this.jobService = container.resolve('jobService');
    this.driverJobService= container.resolve('driverJobService');
  }

  createJob = async (req, res) => {
    try {
      const bodyData = req.body;
      const imageData = req.uploadedFiles;
      const userId = req.user.userId;
      const jobType= typeConstants.jobType.outJob;
      const createrType= typeConstants.createrType.driver;
      const result = await this.jobService.storeJobData(bodyData, imageData , userId , jobType ,createrType);
      if (result) {
        return sendSuccessResponse(res, 'CREATED','Job Has Been Successfully Created', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }
    } catch (error) {
      logger.error(`createJob Error: ${error}`);

      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  //out job
  myOutJob = async (req, res) => {
    try {
      const userId = req.user.userId;
      const jobType= typeConstants.jobType.outJob;
      const result = await this.driverJobService.driverOutJobUpcoming(userId , jobType);
      if (result) {
        return sendSuccessResponse(res, 'OK','Successfully Fetch', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

   OutJobPast = async (req, res) => {
    try {
      const userId = req.user.userId;
      const jobType= typeConstants.jobType.outJob;
      
      const result = await this.driverJobService.driverOutJobPast(userId,jobType);
      if (result) {
        return sendSuccessResponse(res, 'OK','Successfully Fetch', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  unAssignedOutJob = async (req, res) => {
    try {
      const userId = req.user.userId;
      const jobType= typeConstants.jobType.outJob;
      
      const result = await this.driverJobService.driverOutJobUnAssigned(userId,jobType);
      if (result) {
        return sendSuccessResponse(res, 'OK','Successfully Fetch', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  //injob

  myInJob = async (req, res) => {
    try {
      const userId = req.user.userId;
      const jobType= typeConstants.jobType.inJob;
      const result = await this.driverJobService.driverOutJobUpcoming(userId , jobType);
      if (result) {
        return sendSuccessResponse(res, 'OK','Successfully Fetch', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  
   inJobPast = async (req, res) => {
    try {
      const userId = req.user.userId;
      const jobType= typeConstants.jobType.inJob;
      const result = await this.driverJobService.driverOutJobPast(userId,jobType);
      if (result) {
        return sendSuccessResponse(res, 'OK','Successfully Fetch', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  requestInJob = async (req, res) => {
    try {
      const userId = req.user.userId;
      const jobType= typeConstants.jobType.inJob;
      const result = await this.driverJobService.requestJob(userId,jobType);
      if (result) {
        return sendSuccessResponse(res, 'OK','Successfully Fetch', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  acceptJob = async (req,res)=>{
    const {job_id,driver_id,accept}= req.body;
     try {
      const result = await this.driverJobService.accetpJobService(job_id,driver_id,accept);
      if(result.status == 'job_id_not_found'){
        return sendErrorResponse(res, 'BAD_REQUEST', "job_id_not_found");
      }
      if(result.status == 'Invalid_driver_id_format'){
        return sendErrorResponse(res, 'BAD_REQUEST', "Invalid_driver_id_format");
      }
      return sendSuccessResponse(res, 'OK','success', result);
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

}

export default new driverJobController();
