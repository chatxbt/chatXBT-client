import { credentials } from '../../config';
export default class Issue extends Error {
  statusCode: number;
  date: Date;

  // Pass remaining arguments (including vendor specific ones) to parent constructor
  constructor(statusCode = 500, ...params: any) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Issue);
    }

    this.name = 'CustomErrorHandler';
    // Custom debugging information
    this.statusCode = statusCode;
    this.date = new Date();
    if (statusCode === 500) {
      // notify error to team on slack or discord
      
    }
  }
}
