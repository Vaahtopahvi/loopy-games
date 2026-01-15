import express, { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE = "7d"; // Token expires in 7 days

/**
 * POST /auth/login
 * Authenticates admin with email and password
 * Returns JWT token if credentials are valid
 *
 * Request body: { email: string, password: string }
 * Response: { token: string, user: { id, email, isAdmin } }
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Only admins can log in" });
    }

    // Generate JWT token
    // This token contains the user's id, email, and isAdmin status
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

/**
 * POST /auth/register
 * Creates a new admin user (you should restrict this!)
 * For now, anyone can create an account, but isAdmin is false by default
 *
 * Request body: { email: string, password: string }
 * Response: { message: string, user: { id, email, isAdmin } }
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Create new user (isAdmin will be false by default)
    const newUser = new User({
      email,
      password,
      isAdmin: false,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

/**
 * GET /auth/me
 * Protected route - returns current authenticated user info
 * Requires valid JWT token in Authorization header
 */
router.get("/me", authenticate, async (req: Request, res: Response) => {
  try {
    // User info is already attached by authenticate middleware
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(req.user.id).select("-password");

    res.json({
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
