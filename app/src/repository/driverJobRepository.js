"use strict";
import mongoose from "mongoose";
import jobModel from "./../../model/jobModel.js";
import JobLocationModel from "./../../model/JobLocationModel.js";
import billModel from "../../model/billModel.js";
import userModel from "../../model/userModel.js";
 
class driverJobRepository {
  constructor() { }
  //
  async findUpcomingOutJob(query, jobType, isAssigned) {
    const queryData = {
      job_type: jobType,
      createdBy: { $ne: new mongoose.Types.ObjectId(query.createdBy) },
      dates: query.dates,
      isAssigned: isAssigned
    }
    try {
      const result = await jobModel.aggregate([
        {
          $match: queryData,
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
          $unwind: "$locations"
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
  //
  async findPastOutJob(query, jobType, isAssigned) {

    try {
      const queryData = {
        job_type: jobType,
        createdBy: new mongoose.Types.ObjectId(query.createdBy),
        dates: query.dates,
        isAssigned: isAssigned
      }
      console.log(queryData);
      const result = await jobModel.aggregate([
        {
          $match: queryData,
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
          $unwind: "$locations"
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
  async findUnAssignedJob(userId, jobType, isAssigned) {
    try {
      const queryData = {
        job_type: jobType,
        createdBy: new mongoose.Types.ObjectId(userId),
        isAssigned: isAssigned
      }
      console.log(queryData);
      const result = await jobModel.aggregate([
        {
          $match: queryData,
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
          $unwind: "$locations"
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
  async findRequestJob(userId, jobType, isAssigned) {
     console.log(userId);
    try {
      const queryData = {
        // job_type: jobType,
        createdBy: { $ne: new mongoose.Types.ObjectId(userId) },
        isAssigned: false
      }
      
      const result = await jobModel.aggregate([
        {
          $match: queryData,
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
          $unwind: "$locations"
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
  async createBill(data) {
    try {
      return await billModel.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  async driverAcceptJob(job_id, driver_id, accept) {
    try {
      if (!mongoose.Types.ObjectId.isValid(driver_id)) {
        return { status: 'Invalid_driver_id_format' };
      }
      const job = await jobModel.findOne({ _id: job_id });
      if (!job) {
        return { status: 'job_id_not_found' }
      }
      const update = await jobModel.updateOne(
        { _id: job._id },
        { $set: { driverId: driver_id, isAssigned: true } }
      );
      return update;
    }
    catch (error) {
      throw new Error(error);
    }
  }
}
export default new driverJobRepository();
