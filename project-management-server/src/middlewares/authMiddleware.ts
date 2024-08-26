import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

interface JwtPayload {
  userId: number;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = decoded;  // Attach the decoded JWT payload to the request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
    return;
  }
};

export default authMiddleware;
