"use strict";
import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: false },
  notification_type: {  type: String, required: true, trim: true },
  subject: { type: String,   trim: true },
  content: { type: String,   trim: true },
  isRead: { type: Boolean, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }, 
});
notificationSchema.index({ user_id: 1 });
const notificationModel = mongoose.model('loginhistory', notificationSchema);
export default notificationModel;
