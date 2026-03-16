import UserModel from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const user = await UserModel.findById(userId);
    console.log(userId);
    if (!user) {
      return res.status(404).json({ message: "Current user is not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log("getCurrentUser error:", err);
    return res.status(500).json({ message: `getCurrent user ${err}` });
  }
};
