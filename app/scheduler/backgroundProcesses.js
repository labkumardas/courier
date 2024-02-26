// backgroundProcesses.js
"use strict"
import LogArchiver from './zipCron.js';
import testCron from './testCron.js';

// Start the log archiver cron job
const logArchiver = new LogArchiver();
logArchiver.start();

// Start the test cron job
const testCronJob = new testCron();
testCronJob.insertOrUpdateTeamCron();
