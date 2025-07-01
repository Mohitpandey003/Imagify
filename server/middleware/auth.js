import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default userAuth;
