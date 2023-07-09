import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const deleteUserService = async (user_id: string) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      id: user_id,
    },
  });

  await userRepo.remove(user!);
};

export default deleteUserService;
