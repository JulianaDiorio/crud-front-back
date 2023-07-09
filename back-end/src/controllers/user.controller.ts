import { Request, Response } from "express";
import createUserService from "../services/createUser.service";
import { IUserLogin, IUserUpdate } from "../interfaces/user";
import { loginService } from "../services/login.service";
import { updateUserService } from "../services/updateUser.service";
import deleteUserService from "../services/deleteUser.service";
import { retrieveEspecificUserService } from "../services/retrieveEspecificUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const loginController = async (req: Request, res: Response) => {
  const sessionData: IUserLogin = req.body;
  const token = await loginService(sessionData);
  return res.status(200).json(token);
};

export const retrieveEspecificUserController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const user = await retrieveEspecificUserService(userId);
  return res.status(200).json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const user = await updateUserService(userData, req.params.id);
  return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const deleteUser = await deleteUserService(req.params.id);
  return res.status(204).json(deleteUser);
};
