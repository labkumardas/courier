"use strict";
import container from '../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../util/responseHandler.js';
class globalController {
  constructor() {
    this.jobService = container.resolve('jobService');
   
  }
 
}

export default new globalController();
