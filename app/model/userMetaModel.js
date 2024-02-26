"use strict";
import mongoose from 'mongoose';
const userMetaSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, unique: false, },
  company_number: { type: String, trim: true },
  address1: { type: String, trim: true },
  address2: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  zipcode: { type: String, trim: true },
});
userMetaSchema.index({ user_id: 1, zipcode: 1 });
const userMetaModel = mongoose.model('usermeta', userMetaSchema);
export default userMetaModel;
