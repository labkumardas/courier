"use strict";
import mongoose from 'mongoose';
const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  role_slug: { type: String, required: true, trim: true ,unique: true },
  role_id: { type: Number, required: true, trim: true, unique: true },
  createdAt: { type: Date, default: Date.now }, 
});
roleSchema.index({ role: 1, role_id: 1 , role_slug:1 });
const roleModel = mongoose.model('roles', roleSchema);
export default roleModel;
