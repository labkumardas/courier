"use strict";
import mongoose from 'mongoose';
const userDocumentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, unique: false, },
  doc_type: { type: String,  trim: true  },
  docurl: { type: String,   trim: true },
   
});
userDocumentSchema.index({ user_id: 1, doc_type: 1  });
const userDocumentModel = mongoose.model('userdocuments', userDocumentSchema);
export default userDocumentModel;
