"use strict";
import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  name:{type:String,trim:true},
  location:{type:String , trim: true} ,
  addressLine1:{type:String , trim: true} ,
  addressLine2:{type:String , trim: true} ,
  city:{type:String , trim: true} ,
  state:{type:String , trim: true} ,
  zip_code:{type:String , trim: true},
  latitude: {type:String , trim: true , required: false},
  longitude:{type:String , trim: true , required: false},
  placeId:{ type:String , trim: true , required: false},
  createdAt: { type: Date, default: Date.now },
});
// jobTrackSchema.index({ job_id: 1  });
const contactModel = mongoose.model('contact', contactSchema);
export default contactModel;
