"use strict";
import mongoose from 'mongoose';
const loginhistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  userToken: {  type: String, required: true, trim: true },
  deviceType: { type: String,   trim: true },
  deviceId: { type: String,   trim: true },
  isActive: { type: Boolean, required: true, trim: true },
  isBlacklist: { type: Boolean, required: true, trim: true },
  lastLogin: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }, 
});
loginhistorySchema.index({ user_id: 1 });
const loginHistoryModel = mongoose.model('loginhistory', loginhistorySchema);
export default loginHistoryModel;
