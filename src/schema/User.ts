import { Schema, model } from "mongoose";
import { IUserSchema } from "../interface/schema";

const UserSchema = new Schema<IUserSchema>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profilePicture: {
    type: String,
  },
  activeStreamKey: {
    type: String,
  },
  streamKeysHistory: {
    type: [String],
  },
  emailAddress: {
    type: String,
    required: [true, "Email address is required"],
  },
  hashedRt: {
    type: String,
  },
});

UserSchema.set("timestamps", true);
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

const User = model("user", UserSchema, "User");

export { User };
