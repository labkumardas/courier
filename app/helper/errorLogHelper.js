"use strict";
import fs from 'fs';
import path from 'path';
const logDirectory = './logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

class ErrorLogger {
  static logError(error, functionName) {
    const logFileName = `${functionName}_error.log`;
    const logFilePath = path.join(logDirectory, logFileName);
    const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;
    fs.appendFileSync(logFilePath, errorMessage, 'utf8');
    console.error(`Error logged to ${logFilePath}: ${error.message}`);
  }
}

export default ErrorLogger;
