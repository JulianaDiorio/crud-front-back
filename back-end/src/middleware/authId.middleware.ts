import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appErrors";
import { AppDataSource } from "../data-source";

export const authIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAdm = AppDataSource.getRepository(User);

  const admin = await userAdm.findOneBy({ id: req.params.id });

  if (!admin) {
    throw new AppError("Invalid ID", 404);
  }

  return next();
};
