import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateJWTTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // protect XSS attacks cross-site scripting attacks, not accessible by javascript
    sameSite: "strict", // protect CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV !== "development",
  });
  return token;
};
