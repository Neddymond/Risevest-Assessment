import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const validateInputData = (schema, type: string) => async(req: Request, res: Response, next: NextFunction) => {
  try {
    const getType = {
      payload: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const options = { language: { key: '{{key}} ' } };
    const data = getType[type];

    const isValid = await schema.validate(data, options);
    if (!isValid.error) {
      return next();
    }

    const { message } = isValid.error.details[0];
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ status: false, message: message.replace(/["]/gi, '') });
  } catch (error) {
      return next(error);
  }
};
