import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/jwt-token-utils";

export function protectUserRoute(req: Request, res: Response, next: NextFunction) {
  const header = (req.headers["authorization"] as string) || (req.headers["Authorization"] as string);
  const token = header ? header.split(" ").splice(-1).pop() : null;

  if (!token) return res.status(401).json({ status: 401, message: "Session expired. Please login again." });

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "Session expired. Please login again." });
  }
}
