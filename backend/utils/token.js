import jwt from "jsonwebtoken";

export const getToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);
    return;
  } catch (err) {
    console.log(err);
  }
};
