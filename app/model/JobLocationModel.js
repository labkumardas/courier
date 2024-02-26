"use strict";
import mongoose from 'mongoose';
const jobLocationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs', required: true },
  location:{type:String , trim: true} ,
  addressLine1:{type:String , trim: true} ,
  addressLine2:{type:String , trim: true} ,
  city:{type:String , trim: true} ,
  state:{type:String , trim: true} ,
  zip_code:{type:String , trim: true} ,
  en_route: { type: Boolean  , default:false },
  pickup:{type:String , trim: true} ,
  pickup_count:{type:Number , trim: true} ,
  drop_off:{type:String , trim: true} ,
  drop_off_count:{type:Number , trim: true} ,
  pick_drop_note:{type:String , trim: true} ,
  reached_at_location: { type: Boolean , default:false },
  collected: { type: Boolean  , default:false },
  createdAt: { type: Date, default: Date.now },
});
//jobTrackSchema.index({ job_id: 1  });
const JobLocationModel = mongoose.model('joblocation', jobLocationSchema);
export default JobLocationModel;
