import { Router } from "express";
import { watchVideo } from "../controllers/watch.controller";

const router = Router();

router.get("/:id", watchVideo);

export { router as watchRouter };
