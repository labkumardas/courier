"use strict";
import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, unique: false, },
  email: { type: String, required: true, trim: true  },
  otp: { type: String, required: true, trim: true,   },
  isVerify: { type: Boolean, required: true, trim: true },
  expiresAt: { type: Date, default: Date.now() + 2 * 60 * 1000 }, // 2 minutes expiration
}, { timestamps: true });

 
otpSchema.index({ user_id: 1  });
const otpModel = mongoose.model('otp', otpSchema);
export default otpModel;
