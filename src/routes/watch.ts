import { Router } from "express";
import { fetchAllVideos, fetchVideoByID, watchVideo } from "../controllers/watch.controller";

const router = Router();

router.get("/:id", watchVideo).get("/", fetchAllVideos).get("/:id/info", fetchVideoByID);

export { router as watchRouter };
