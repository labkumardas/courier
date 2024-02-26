"use strict";
import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
  dates: { type: String, trim: true },
  time_slot : { type: String, trim: true },
  start_time: { type: String, trim: true },
  end_time: { type: String, trim: true },
  vehicle: { type: String, trim: true },
  weight: { type: String, trim: true },
  contactNumber: { type: String, trim: true },
  note: { type: String, trim: true },
  isCancelled: { type: Boolean, default: false },
  reason: { type: String, trim: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' ,default:null },
  createdBy: { type: mongoose.Schema.Types.ObjectId , ref: 'Users', required: true },
  isAssigned:{type:Boolean ,default: false },
  document: [String],
  createrType: [String],
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed', 'Canceled'],
    default: 'Pending',
  },
  job_type: {
    type: String,
    enum: ['IN_JOB', 'OUT_JOB'],
    default: null,
  },
  amount: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});
// jobSchema.index({ user_id: 1  });
const jobModel = mongoose.model('job', jobSchema);
export default jobModel;
