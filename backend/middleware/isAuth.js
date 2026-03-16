import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token || token === "undefined" || token === "null" || token.trim() === "") {
      return res.status(400).json({ message: "Token is not found or invalid" });
    }
    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    if (!verifyToken) {
      return res.status(400).json({ message: "User doesn't have verified token" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (err) {
    return res.status(500).json({ message: `is auth error ${err}` });
  }
};

export default isAuth;
