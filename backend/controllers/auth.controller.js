import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const PROFILE_IMAGES = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image =
      PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];

    const user = await User.create({ email, username, password, image });
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  res.send("logIn route");
};

export const logOut = async (req, res) => {
  res.send("logOut route");
};
