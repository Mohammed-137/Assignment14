import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// ----------------------
// Generate JWT Token
// ----------------------
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("❌ ERROR: JWT_SECRET missing in env");
    throw new Error("JWT secret not configured");
  }

  return jwt.sign({ id: user._id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ----------------------
// REGISTER CONTROLLER
// ----------------------
export const register = async (req, res) => {
  // Validate Input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const first = errors.array()[0];
    return res.status(400).json({ message: first.msg, errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// LOGIN CONTROLLER
// ----------------------
export const login = async (req, res) => {
  // Validate Input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const first = errors.array()[0];
    return res.status(400).json({ message: first.msg, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = generateToken(user);

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
