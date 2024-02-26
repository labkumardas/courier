"use strict";
import mongoose from 'mongoose';
const inquirySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  title:{type:String,trim:true},
  description:{type:String , trim: true} ,
  createdAt: { type: Date, default: Date.now },
});
// jobTrackSchema.index({ job_id: 1  });
const inquiryModel = mongoose.model('inquiry', inquirySchema);
export default inquiryModel;
