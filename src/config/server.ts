export const serverConfig = {
  version: "1.0.0",
  port: process.env.PORT || 5000,
  databaseUri: process.env.DATABASE_URI!,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  accessTokenValidity: 1000 * 60 * 5, // 5 minutes
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  refreshTokenValidity: 1000 * 60 * 60 * 24 * 5, // 5 days
};
