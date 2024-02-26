// scheduler.js
import cron from 'cron';
import fs from 'fs';
import archiver from 'archiver';
class LogArchiver {
  constructor() {
    this.schedule = '0 0 1 */2 *'; // Run on the 1st day every two months
    this.job = new cron.CronJob(this.schedule, this.archiveLogs.bind(this), null, true);
  }

  archiveLogs() {
    try {
      const archive = archiver('zip');
      const output = fs.createWriteStream(`logs_archive_${new Date().toISOString()}.zip`);

      archive.pipe(output);
      archive.directory('logs/', false);

      archive.finalize();

      output.on('close', () => {
        // Delete the original log files after archiving
        this.deleteOriginalLogs();
        console.log('Logs archived and original files deleted successfully.');
      });
    } catch (error) {
      console.error('Error archiving logs:', error.message);
    }
  }

  deleteOriginalLogs() {
    try {
      const logFiles = fs.readdirSync('logs');

      logFiles.forEach((file) => {
        const filePath = `logs/${file}`;
        fs.unlinkSync(filePath);
        console.log(`Deleted original log file: ${filePath}`);
      });
    } catch (error) {
      console.error('Error deleting original log files:', error.message);
    }
  }

  start() {
    console.log('Cron job started:', this.schedule);
    this.job.start();
  }

}
// Create an instance of LogArchiver and start the cron job
const logArchiver = new LogArchiver();
logArchiver.start();
export default LogArchiver;

