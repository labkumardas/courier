"use strict";
import mongoose from 'mongoose';
const priceSettingsSchema = new mongoose.Schema({
  vehichle_type: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true ,unique: true },
  price_per: {
    type: String,
    enum: ['KILOMETER', 'HOUR'],
    default: 'KILOMETER',
  },
  createdAt: { type: Date, default: Date.now }, 
});
 const priceSettingModel = mongoose.model('priceSettings', priceSettingsSchema);
export default priceSettingModel;
