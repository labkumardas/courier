"use strict";
import mongoose from 'mongoose';
const billSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    amount: { type: String, trim: true },
    additional_amount: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    signature: { type: String, trim: true , default:null},
});
const billModel = mongoose.model('bill', billSchema);
export default billModel;
