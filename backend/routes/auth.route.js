import express from "express";
import { body } from "express-validator";

import { logIn, logOut, signUp } from "../controllers/auth.controller.js";
import User from "../models/user.model.js";
import { validationResults } from "../ultis/validationResult.js";

const router = express.Router();

const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("UserName is required")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validationResults,
];

const logInValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validationResults,
];

router.post("/sign-up", signUpValidation, signUp);
router.post("/log-in", logInValidation, logIn);
router.post("/log-out", logOut);

export default router;
