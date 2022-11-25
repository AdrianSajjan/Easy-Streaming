import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  thumbnail: {
    type: String,
  },
  videoURL: {
    type: String,
  },
  description: {
    type: String,
  },
  isLiveVideo: {
    type: Boolean,
  },
  streamKey: {
    type: String,
  },
  liveVideoURL: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

VideoSchema.set("timestamps", true);

const Video = mongoose.model("Video", VideoSchema, "video");

export { Video };
