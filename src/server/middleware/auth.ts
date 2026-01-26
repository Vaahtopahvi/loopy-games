import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

//get JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extend Express Request to include user information
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        isAdmin: boolean;
      };
    }
  }
}

/**
 * Authentication middleware - verifies JWT token from Authorization header
 * Tokens should be in format: "Bearer <token>"
 * If valid, adds user data to req.user and calls next()
 * If invalid/missing, returns 401 Unauthorized
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Missing or invalid authorization token" });
      return;
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(
      token,
      JWT_SECRET);

    // Attach user data to request object
    if (typeof decoded === "object" && "id" in decoded) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      };
    }

    // Continue to next middleware/route
    next();
  } catch {
    // Token is invalid or expired
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

/**
 * Admin-only middleware - checks if user is authenticated AND is admin
 * Must be used AFTER authenticate middleware
 */
export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  next();
};
