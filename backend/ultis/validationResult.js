import { validationResult } from "express-validator";

export const validationResults = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: result.array()[0].msg,
    });
  }
  next();
};
