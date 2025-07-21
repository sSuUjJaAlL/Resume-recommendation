import { HttpExceptions } from "../exceptions";
import { NextFunction, Response, Request } from "express";
import matcherLogger from "../libs/logger.libs";
import statusCode from "http-status-codes";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpExceptions) {
    res.status(error.getStatusCode()).json({
      message: error.getMessage(),
      error: true,
      statusCode: error.getStatusCode(),
    });
  }

  matcherLogger.error("Unhandled Error found. Error: " + error);

  res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    message: "Unhandle Error Found: " + error?.message,
    error: true,
    statusCode: statusCode.INTERNAL_SERVER_ERROR,
  });
};
