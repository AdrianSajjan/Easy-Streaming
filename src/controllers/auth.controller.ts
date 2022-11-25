import bcrypt from "bcrypt";
import type { Request, Response } from "express";

import { User } from "../schema/User";
import { handleServerError } from "../lib/server-error";
import { LoginRequestBody } from "../interface/authentication";
import { issueAccessToken, issueRefreshToken, verifyRefreshToken } from "../lib/jwt-token-utils";

const login = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password }: LoginRequestBody = req.body;
    const user = await User.findOne({ emailAddress });
    if (!user) return res.status(400).json({ status: 400, error: "Login Error", message: "Provided credentials are not valid" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ status: 400, error: "Login Error", message: "Provided credentials are not valid" });
    const payload = { id: user.id };
    const [accessToken, refreshToken] = [issueAccessToken(payload), issueRefreshToken(payload)];
    const { password: p, ...rest } = user.toObject();
    return res.json({ user: rest, accessToken, refreshToken });
  } catch (error) {
    handleServerError(error, res);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, emailAddress, password } = req.body;
    const exists = await User.findOne({ emailAddress });
    if (exists) return res.status(400).json({ status: 400, error: "Registration Error", message: "Email address exists in the database" });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, emailAddress, password: hashedPassword });
    const payload = { id: user.id };
    const [accessToken, refreshToken] = [issueAccessToken(payload), issueRefreshToken(payload)];
    const { password: p, ...rest } = user.toObject();
    return res.json({ user: rest, accessToken, refreshToken });
  } catch (error) {
    handleServerError(error, res);
  }
};

const session = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ status: 401, message: "Session expired or not valid." });
    return res.json({ user });
  } catch (error) {
    handleServerError(error, res);
  }
};

const oauth2 = (req: Request, res: Response) => {
  try {
    const { refreshToken: oldRefreshToken } = req.body;
    try {
      const user = verifyRefreshToken(oldRefreshToken);
      const payload = { id: user.id };
      const [accessToken, refreshToken] = [issueAccessToken(payload), issueRefreshToken(payload)];
      return res.json({ accessToken, refreshToken });
    } catch (e) {
      res.status(401).json({ status: 401, message: "Session expired. Please login again." });
    }
  } catch (error) {
    handleServerError(error, res);
  }
};

const logout = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleServerError(error, res);
  }
};

export { login, logout, register, session, oauth2 };
