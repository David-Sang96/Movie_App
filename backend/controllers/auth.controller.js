import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import { generateJWTTokenAndSetCookie } from "../ultis/generateJWTToken.js";

export const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const PROFILE_IMAGES = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image =
      PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];

    const user = await User.create({ email, username, password, image });
    generateJWTTokenAndSetCookie(res, user._id);
    user.password = undefined;

    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    generateJWTTokenAndSetCookie(res, user._id);
    user.password = undefined;

    res.json({ success: true, message: "Logged in successfully", user });
  } catch (error) {
    console.log("Error in logIn controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
