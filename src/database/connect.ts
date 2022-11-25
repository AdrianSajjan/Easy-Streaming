import mongoose from "mongoose";
import { serverConfig } from "../config/server";

const connectDatabase = mongoose.connect(serverConfig.databaseUri);

export { connectDatabase };
