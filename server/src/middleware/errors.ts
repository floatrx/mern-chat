import { NextFunction, Request, Response } from 'express';

/**
 * 404 handler (middleware)
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Error handler (middleware)
 * - expressAsyncHandler will catch async errors and pass them to this middleware
 * @returns status <StatusCode> if internal server error with JSON { message: <ErrorMessage> }
 */
export const mainErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
};

/**
 * Syntax error handler middleware
 * @returns status 400 if syntax error with JSON { message: 'error message' } or call next()
 */
export const syntaxErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
  next();
};
