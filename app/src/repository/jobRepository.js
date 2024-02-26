"use strict";
import jobModel from "./../../model/jobModel.js";
import JobLocationModel from "./../../model/JobLocationModel.js";
import mongoose from "mongoose";

class jobRepository {
  constructor() { }
  //
  async insertJobData(data, locationsDataFromRequest) {
    try {
      const createdJob = await jobModel.create(data);
      const jobId = createdJob._id;
      const insertObj = locationsDataFromRequest.map((element) => ({
        job_id: jobId,
        ...element,
      }));
      return await JobLocationModel.insertMany(insertObj);
    } catch (error) {
      console.log("data layer", error);
      throw new Error(error);
    }
  }
  async getAllTodayJob(query) {
    const { createdBy, dates } = query;
    try {
      const result = await jobModel.aggregate([
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(createdBy),
            isAssigned: true,
          },
        },
        {
          $lookup: {
            from: "joblocations",
            localField: "_id",
            foreignField: "job_id",
            as: "locations",
          },
        },
        {
          $unwind:"$locations"
         },
         {
          $sort: {
            createdAt: -1  
          }
        },
        {
          $group: {
              _id: "$_id",
              dates: { $first: "$dates" },
              // Add other fields you want to keep from the job document
              contactNumber: { $first: "$contactNumber" },
              time_slot: { $first: "$time_slot" },
              start_time: { $first: "$start_time" },
              end_time: { $first: "$end_time" },
              vehicle: { $first: "$vehicle" },
              weight: { $first: "$weight" },
              note: { $first: "$note" },
              isCancelled: { $first: "$isCancelled" },
              driverId: { $first: "$driverId" },
              createdBy: { $first: "$createdBy" },
              isAssigned: { $first: "$isAssigned" },
              document: { $first: "$document" },
              status: { $first: "$status" },
              createdAt: { $first: "$createdAt" },
              locations: { $push: "$locations" },
          },
      },
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getUpcomingJobs(query) {
    const { createdBy, dates } = query;
    try {
      const result = await jobModel.aggregate([
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(createdBy),
            isAssigned: true,
          },
        },
        {
          $lookup: {
            from: "joblocations",
            localField: "_id",
            foreignField: "job_id",
            as: "locations",
          },
        },
        {
          $unwind:"$locations"
         },
         {
          $sort: {
            createdAt: -1  
          }
        },
        {
          $group: {
            _id: "$_id",
            dates: { $first: "$dates" },
            time_slot: { $first: "$time_slot" },
            start_time: { $first: "$start_time" },
            end_time: { $first: "$end_time" },
            vehicle: { $first: "$vehicle" },
            weight: { $first: "$weight" },
            contactNumber: { $first: "$contactNumber" },
            note: { $first: "$note" },
            isCancelled: { $first: "$isCancelled" },
            driverId: { $first: "$driverId" },
            createdBy: { $first: "$createdBy" },
            isAssigned: { $first: "$isAssigned" },
            document: { $first: "$document" },
            status: { $first: "$status" },
            createdAt: { $first: "$createdAt" },
            locations: { $push: "$locations" },
          },
        },
      ]);

      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getUnassignJob(query) {
    const { createdBy } = query;
    try {
      const result = await jobModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(createdBy),
                isAssigned: false,
            },
        },
        {
            $lookup: {
                from: "joblocations",
                localField: "_id",
                foreignField: "job_id",
                as: "locations",
            },
        },
        {
            $unwind: "$locations",
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $group: {
                _id: "$_id",
                dates: { $first: "$dates" },
                // Add other fields you want to keep from the job document
                contactNumber: { $first: "$contactNumber" },
                time_slot: { $first: "$time_slot" },
                start_time: { $first: "$start_time" },
                end_time: { $first: "$end_time" },
                vehicle: { $first: "$vehicle" },
                weight: { $first: "$weight" },
                note: { $first: "$note" },
                isCancelled: { $first: "$isCancelled" },
                driverId: { $first: "$driverId" },
                createdBy: { $first: "$createdBy" },
                isAssigned: { $first: "$isAssigned" },
                document: { $first: "$document" },
                status: { $first: "$status" },
                createdAt: { $first: "$createdAt" },
                locations: { $push: "$locations" },
            },
        },
        {
            $project: {
                _id: 1,
                dates: 1,
                contactNumber: 1,
                time_slot: 1,
                start_time: 1,
                end_time: 1,
                vehicle: 1,
                weight: 1,
                note: 1,
                isCancelled: 1,
                driverId: 1,
                createdBy: 1,
                isAssigned: 1,
                document: 1,
                status: 1,
                createdAt: 1,
                locations: 1,
            },
        },
    ]);
    
        

      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getPastJob(query) {
    const { createdBy, dates } = query;
    console.log(query);
    try {
       
      const result = await jobModel.aggregate([
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(createdBy),
            dates: dates,
            isAssigned: true
          },
        },
        {
          $lookup: {
            from: "joblocations",
            localField: "_id",
            foreignField: "job_id",
            as: "locations",
          },
        },
        {
          $unwind:"$locations"
         },
         {
          $sort: {
            createdAt: -1  
          }
        },
        {
          $group: {
              _id: "$_id",
              dates: { $first: "$dates" },
              // Add other fields you want to keep from the job document
              contactNumber: { $first: "$contactNumber" },
              time_slot: { $first: "$time_slot" },
              start_time: { $first: "$start_time" },
              end_time: { $first: "$end_time" },
              vehicle: { $first: "$vehicle" },
              weight: { $first: "$weight" },
              note: { $first: "$note" },
              isCancelled: { $first: "$isCancelled" },
              driverId: { $first: "$driverId" },
              createdBy: { $first: "$createdBy" },
              isAssigned: { $first: "$isAssigned" },
              document: { $first: "$document" },
              status: { $first: "$status" },
              createdAt: { $first: "$createdAt" },
              locations: { $push: "$locations" },
          },
      },

      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async jobById(id) {
    try {
      const result = await jobModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "joblocations",
            localField: "_id",
            foreignField: "job_id",
            as: "location",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "driverId",
            foreignField: "_id",
            as: "driver",
          },
        },
        {
          $unwind: {
            path: "$location",
          },
        },
        {
          $group: {
              _id: "$_id",
              dates: { $first: "$dates" },
              // Add other fields you want to keep from the job document
              contactNumber: { $first: "$contactNumber" },
              time_slot: { $first: "$time_slot" },
              start_time: { $first: "$start_time" },
              end_time: { $first: "$end_time" },
              vehicle: { $first: "$vehicle" },
              weight: { $first: "$weight" },
              note: { $first: "$note" },
              isCancelled: { $first: "$isCancelled" },
              driverId: { $first: "$driverId" },
              createdBy: { $first: "$createdBy" },
              isAssigned: { $first: "$isAssigned" },
              document: { $first: "$document" },
              status: { $first: "$status" },
              createdAt: { $first: "$createdAt" },
              locations: { $push: "$locations" },
          },
      },
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async cancelJobRepo(jobId,reasone,jobStatus) {
    try {
      const updatedJob = await JobLocationModel.findOneAndUpdate(
        { jobId: jobId },
        { reasone: reasone, jobStatus: jobStatus },
        { new: true }  
      );
      return updatedJob;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
export default new jobRepository();
