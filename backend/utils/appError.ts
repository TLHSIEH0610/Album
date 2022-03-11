class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; //4xx: fail
    this.isOperational = true;

    //avoid polluting original stack trace
    Error.captureStackTrace(this, this.constructor); //this: current object, this.constructor: AppError class
  }
}

export default AppError;
