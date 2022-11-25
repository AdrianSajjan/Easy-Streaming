import jwt, { SignOptions } from "jsonwebtoken";
import { serverConfig } from "../config/server";
import { UserPayload } from "../interface/authentication";

const issueAccessToken = (payload: UserPayload, options: SignOptions = {}) => {
  return jwt.sign(payload, serverConfig.accessTokenSecret, { ...options, expiresIn: serverConfig.accessTokenValidity });
};

const issueRefreshToken = (payload: UserPayload, options: SignOptions = {}) => {
  return jwt.sign(payload, serverConfig.refreshTokenSecret, { ...options, expiresIn: serverConfig.refreshTokenValidity });
};

const verifyRefreshToken = (refreshToken: string): UserPayload => {
  return jwt.verify(refreshToken, serverConfig.refreshTokenSecret) as UserPayload;
};

const verifyAccessToken = (accessToken: string): UserPayload => {
  return jwt.verify(accessToken, serverConfig.accessTokenSecret) as UserPayload;
};

export { issueAccessToken, issueRefreshToken, verifyRefreshToken, verifyAccessToken };
