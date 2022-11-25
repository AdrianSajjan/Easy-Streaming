import { Response } from "express";

const handleServerError = (e: unknown, res: Response) => {
  const error = e as any;
  return res.status(500).json({
    status: 500,
    error: error.message ? error.message : error,
    message: "Internal server error",
  });
};

export { handleServerError };
