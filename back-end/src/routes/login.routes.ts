import { Router } from "express";
import { loginController } from "../controllers/user.controller";

export const loginRoutes = Router();

loginRoutes.post("", loginController);
