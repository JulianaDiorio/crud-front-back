import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appErrors";
import { userWithoutPasswordSerializer } from "../serializers/user.serializer";

export const retrieveEspecificUserService = async (idUser: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const especificUser = await userRepository.findOneBy({ id: idUser });

  if (!especificUser) {
    throw new AppError("user not found", 404);
  }

  const validatedUser = await userWithoutPasswordSerializer.validate(
    especificUser,
    {
      stripUnknown: true,
    }
  );

  return validatedUser;
};
