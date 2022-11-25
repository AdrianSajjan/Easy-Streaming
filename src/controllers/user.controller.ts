import type { Request, Response } from "express";
import { User } from "../schema/User";
import { handleServerError } from "../lib/server-error";

const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const file = req.file!;
    const id = req.user.id;
    const user = await User.findByIdAndUpdate(id, { $set: { profilePicture: file.path } }, { new: true }).select("-password");
    return res.json({ user });
  } catch (error) {
    handleServerError(error, res);
  }
};

export { uploadProfilePicture };
