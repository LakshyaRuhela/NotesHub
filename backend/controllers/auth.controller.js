import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body; // get data from body
    let user = await UserModel.findOne({ email });
    // if user not presenet create i
    if (!user) {
      user = await UserModel.create({
        name,
        email,
      });
    }
    let token = await getToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }
    res.cookie("token", token, {
      httpOnly: true,
      // secure: false,
      // sameSite: "strict",
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `googleSignup ${err}` });
  }
};

// logout function
export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "logout successfully" });
  } catch (err) {
    return res.status(200).json({ message: "logout Error" });
    console.log(err);
  }
};
