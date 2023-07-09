import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appErrors";
import { IUserResponse, IUserUpdate } from "../interfaces/user";

export const updateUserService = async (
  body: IUserUpdate,
  idUser: string
): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: { id: idUser },
  });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  const updateUser = await userRepo.save({
    ...user,
    ...body,
  });

  return updateUser;
};
