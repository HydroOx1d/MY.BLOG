import { validationResult } from 'express-validator'

export const handleValidationError = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).json(error.array())
  }

  next()
}