import { Router } from "express";
import {
  login,
  logout,
  signup,
  whoami,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.get("/whoami", whoami);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/signup", signup);
