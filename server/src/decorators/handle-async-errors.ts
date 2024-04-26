/**
 * This module provides a decorators to
 * handle async errors for class and class static methods
 */

import type { NextFunction, Request, Response } from 'express';

/**
 * Handle async errors decorator for class methods
 */
export function handleMethodError() {
  // HTTP Errors
  const ERROR_MAP = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  };
  return function (_target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        await originalMethod.call(this, req, res, next);
      } catch (error) {
        // console.error('An error occurred:', { error: error.message, action: methodName });

        // Set default status code
        if (res.statusCode === 200) res.status(500);

        // Send error response
        res.json({
          status: res.statusCode,
          error: ERROR_MAP[res.statusCode],
          message: error.message,
          action: methodName,
        });
      }
    };

    return descriptor;
  };
}

type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Handle async errors all class static methods
 * @param target
 * @example @handleAsyncErrors
 *  export class SomeControllerClass { ... }
 */
export function handleAsyncErrors<T extends Constructor>(target: T) {
  const originalMethods = Object.getOwnPropertyNames(target);

  originalMethods.forEach((methodName) => {
    if (methodName !== 'constructor') {
      // Skip constructor
      const descriptor = Object.getOwnPropertyDescriptor(target, methodName);
      if (descriptor && typeof descriptor.value === 'function') {
        // Apply method decorator
        Object.defineProperty(target, methodName, handleMethodError()(target, methodName, descriptor));
      }
    }
  });

  return target;
}
