import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  retrieveEspecificUserController,
  updateUserController,
} from "../controllers/user.controller";
import { authTokenMiddleware } from "../middleware/authToken.middleware";
import { authIdMiddleware } from "../middleware/authId.middleware";
import { ensureDataValidMiddleware } from "../middleware/ensureDataValid.miffleware";
import { userSerializer } from "../serializers/user.serializer";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataValidMiddleware(userSerializer),
  createUserController
);

userRoutes.get("/", authTokenMiddleware, retrieveEspecificUserController);

userRoutes.patch(
  "/:id",
  authTokenMiddleware,
  authIdMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  authTokenMiddleware,
  authIdMiddleware,
  deleteUserController
);
