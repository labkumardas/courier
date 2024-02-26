"use strict";
import mongoose from 'mongoose';
const locationTrackSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs', required: true },
  location_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'joblocation', required: true },
  en_route: { type: Boolean  , default:false },
  reached_at_location: { type: Boolean  , default:false },
  collected: { type: Boolean  , default:false },
  finished: { type: Boolean  , default:false },
});
//jobTrackSchema.index({ job_id: 1  });
const locationTrackModel = mongoose.model('locationtracks', locationTrackSchema);
export default locationTrackModel;
