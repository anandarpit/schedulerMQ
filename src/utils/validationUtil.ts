import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ValidationError from '../exceptions/validationError';

class ValidationUtil {
  public validateInput = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors);
    }
    next();
  };
}

export default new ValidationUtil();
