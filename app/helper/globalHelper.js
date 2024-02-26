"use strict";
import moment from 'moment';
 //
class globalHelper {
  constructor() {
  }
  async filterTypeAndCategory(userId, jobType,isAssigned) {
    let query = { createdBy: userId };
    const todayStart = moment().startOf('day');
    if (isAssigned) {
      //query.driverId = { $exists: true, $ne: null };
      if (jobType === 'upcoming') {
        query.dates = { $gte: moment().format('YYYY-MM-DD') };
      }
      if (jobType === 'past') {
        query.dates = { $lt: moment().format('YYYY-MM-DD') };
      }
      if (jobType === 'today') {
        query.dates = moment().startOf('day').format('YYYY-MM-DD');
      }
    } else {
      delete query.dates;
    }
    return query;
  }
  async generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

}
export default globalHelper;