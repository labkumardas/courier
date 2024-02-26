// logger.js
import winston from 'winston';
class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }
  log(message, level, additionalData = {}) {
    this.logger.log({ level, message, additionalData });
  }
  info(message, data) {
    this.log(message, 'info', data);
  }
  error(message, error) {
    this.log(message, 'error', { error });
  }
}

export default Logger;
