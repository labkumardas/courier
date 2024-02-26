"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import logger from 'morgan';
import ErrorLogger from '../../../../helper/errorLogHelper.js';

class userJobController {
  constructor() {
    this.jobService = container.resolve('jobService');
  }

  createJob = async (req, res) => {
    try {
      const bodyData = req.body;
      const imageData = req.uploadedFiles;
      const userId = req.user.userId;
      const jobType= "IN_JOB";
      const createrType= "driver";
      const result = await this.jobService.storeJobData(bodyData, imageData , userId , jobType ,createrType);
      if (result) {
        return sendSuccessResponse(res, 'CREATED','Job create success!', result);
      } else {
        return sendErrorResponse(res, 'BAD_REQUEST', "BAD_REQUEST");
      }

    } catch (error) {
      ErrorLogger.logError(error, 'createJob');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
 
  todayJobList = async(req,res)=>{
    const userId = req.user.userId;
    try {
      const result = await this.jobService.findTodayJob(userId);
      return sendSuccessResponse(res,'OK', 'success!', result );

    } catch (error) {
      ErrorLogger.logError(error, 'todayJobList');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  
  upcomingJobList = async(req,res)=>{
    const userId = req.user.userId;
    try {
      const result = await this.jobService.findUpcomingJob(userId);
      return sendSuccessResponse(res,'OK', 'success!', result );

    } catch (error) {
      ErrorLogger.logError(error, 'upcomingJobList');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  
  pastJob = async(req,res)=>{
    const userId = req.user.userId;
    try {
      const result = await this.jobService.pastJobList(userId);
      return sendSuccessResponse(res,'OK', 'success!', result );

    } catch (error) {
      ErrorLogger.logError(error, 'pastJob');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  unassignJob = async(req,res)=>{
    const userId = req.user.userId;
    try {
      const result = await this.jobService.unassignJobList(userId);
      return sendSuccessResponse(res,'OK', 'success!', result );

    } catch (error) {
      ErrorLogger.logError(error, 'unassignJob');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

  getJobDetails = async(req,res)=>{
    const jobId = req.body.jobId;
    try {
      const result = await this.jobService.jobDetails(jobId);
      return sendSuccessResponse(res,'OK', 'success!', result );

    } catch (error) {
      ErrorLogger.logError(error, 'getJobDetails');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
  
  cancelJob = async(req,res)=>{
    const { jobId , reasone , jobStatus } = req.body;
    try {
      const result = await this.jobService.jobCancel(jobId,reasone,jobStatus);
      return sendSuccessResponse(res,'OK', 'success!', result );
    } catch (error) {
      ErrorLogger.logError(error, 'cancelJob');            
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

}

export default new userJobController();
