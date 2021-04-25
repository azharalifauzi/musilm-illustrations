import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

function defaultErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).send({
      message: '500 Internal Server Error',
      data: err,
    });
  }

  return res.status(500).send({
    message: 'Something Went Wrong!',
  });
}

export { defaultErrorHandler };
