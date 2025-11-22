import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Extract Authorization header (standard format)
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (process.env.NODE_ENV !== 'production') {
      console.log('Auth header raw value:', authHeader);
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      if (process.env.NODE_ENV !== 'production') console.log('Auth header missing or invalid: undefined');
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user (without password) to req
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res
      .status(401)
      .json({ message: "Not authorized, token invalid/expired" });
  }
};
