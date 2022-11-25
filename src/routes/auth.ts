import { Router } from "express";
import { protectUserRoute } from "../middleware/jwt.middleware";
import { validate } from "../middleware/validation.middleware";
import { registrationChain } from "../validations/validate-registration";
import { login, logout, oauth2, register, session } from "../controllers/auth.controller";

const router = Router();

router
  .get("/session", protectUserRoute, session)
  .post("/login", login)
  .post("/register", validate(registrationChain), register)
  .post("/oauth2", oauth2)
  .post("/logout", protectUserRoute, logout);

export { router as authRouter };
