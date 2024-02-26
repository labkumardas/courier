"use strict";
import driverJobRepository from '../../repository/driverJobRepository.js';
import globalHelper from "../../../helper/globalHelper.js";
let isAssigned;
//
class driverJobService {
    constructor() {
        this.helper = new globalHelper();
    }
    async driverOutJobUpcoming(userId, jobType) {
        try {
            isAssigned = true;
            const query = await this.helper.filterTypeAndCategory(
                userId,
                "today",
                isAssigned
            );
            return await driverJobRepository.findUpcomingOutJob(query, jobType,isAssigned);
        } catch (error) {
            throw new Error(error)
        }
    }
    //
    async driverOutJobPast(userId, jobType) {
        try {
            isAssigned = true;
            const query = await this.helper.filterTypeAndCategory(
                userId,
                "past",
                isAssigned
            );
           return await driverJobRepository.findPastOutJob(query, jobType,isAssigned);
        } catch (error) {
            throw new Error(error)
        }
    }

    async driverOutJobUnAssigned(userId, jobType) {
        try {
            isAssigned = false;
            return await driverJobRepository.findUnAssignedJob( userId, jobType,isAssigned);
        } catch (error) {
            throw new Error(error)
        }
    }
    async requestJob(userId, jobType){
        try {
            isAssigned = false;
            return await driverJobRepository.findRequestJob(userId, jobType,isAssigned);
        } catch (error) {
            throw new Error(error)
        } 
    }
    async billInsert(job_id , amount ,additional_amount ,userId ){
        const data ={
            job_id :job_id,
            user_id:userId,
            amount:amount,
            additional_amount:additional_amount   
        }
        try {
            return await driverJobRepository.createBill( data );
        } catch (error) {
            throw new Error(error)
        } 
    }
    async accetpJobService (job_id,driver_id,accept){
         try {
            return await driverJobRepository.driverAcceptJob( job_id,driver_id,accept );
         } catch (error) {
            throw new Error(error)

         }
    }
}

export default new driverJobService();