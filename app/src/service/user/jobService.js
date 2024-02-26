"use strict";
import jobRepository from "../../repository/jobRepository.js";
import globalHelper from "../../../helper/globalHelper.js";
class jobService {
  constructor() {
    this.helper = new globalHelper();
  }
  //
  async findTodayJob(userId) {
    try {
      const jobType = "today";
      const isAssigned = true;
      const query = await this.helper.filterTypeAndCategory(
        userId,
        jobType,
        isAssigned
      );
      return await jobRepository.getAllTodayJob(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async findUpcomingJob(userId) {
    try {
      const jobType = "upcoming";
      const isAssigned = true;
      const query = await this.helper.filterTypeAndCategory(
        userId,
        jobType,
        isAssigned
      );
      return await jobRepository.getUpcomingJobs(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async pastJobList(userId) {
    try {
      const jobType = "past";
      const isAssigned = true;
      const query = await this.helper.filterTypeAndCategory(
        userId,
        jobType,
        isAssigned
      );
      return await jobRepository.getPastJob(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async unassignJobList(userId) {
    try {
      const jobType = null;
      const isAssigned = false;
      const query = await this.helper.filterTypeAndCategory(
        userId,
        jobType,
        isAssigned
      );
      return await jobRepository.getUnassignJob(query);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async jobDetails(id) {
    try {
      return await jobRepository.jobById(id);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async storeJobData(bodyData, imageData, userId , jobType , createrType) {
    const arrayOfUrl = [];
    const locationsDataFromRequest = [];
    try {
      let i = 0;
      while (bodyData[`locations[${i}][location]`] !== undefined) {
        const locationData = {
          location: bodyData[`locations[${i}][location]`],
          addressLine1: bodyData[`locations[${i}][addressLine1]`],
          addressLine2: bodyData[`locations[${i}][addressLine2]`],
          city: bodyData[`locations[${i}][city]`],
          state: bodyData[`locations[${i}][state]`],
          zipcode: bodyData[`locations[${i}][zipcode]`],
          pickup : bodyData[`locations[${i}][pickup]`],
          pickup_count : bodyData[`locations[${i}][pickup_count]`],
          drop_off : bodyData[`locations[${i}][drop_off]`],
          drop_off_count : bodyData[`locations[${i}][drop_off_count]`],
          pick_drop_note: bodyData[`locations[${i}][pick_drop_note]`],
          job_type:jobType,
          en_route: false,
          reached_at_location: false,
          collected: false,
        };
        locationsDataFromRequest.push(locationData);
        i++;
      }

      imageData.forEach((element) => {
        arrayOfUrl.push(element.url);
      });
      const jobDataFromRequest = {
        dates: bodyData.dates,
        time_slot: bodyData.time_slot,
        start_time: bodyData.start_time,
        end_time: bodyData.end_time,
        vehicle: bodyData.vehicle,
        weight: bodyData.weight,
        contactNumber: bodyData.contactNumber,
        note: bodyData.note,
        createdBy: userId,
        createrType:createrType,
        job_type:jobType,
        document: arrayOfUrl,
        isCancelled: false,
        isAssigned:false,
        driverId:null,
        amount:300,
      };
      await jobRepository.insertJobData(
        jobDataFromRequest,
        locationsDataFromRequest
      );
      return jobDataFromRequest;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async jobCancel(jobId,reasone,jobStatus){
    try{
      return await jobRepository.cancelJobRepo(jobId,reasone,jobStatus);
    }
    catch(error){
      throw new Error(error);
    }
  }
}
export default new jobService();
