import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import "dotenv/config";
import { userRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import cors from "cors";
import { handleError } from "./errors/appErrors";

const app: Application = express();
app.use(express.json());

app.use(cors());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleError);

export default app;
