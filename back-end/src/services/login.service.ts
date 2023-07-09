import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appErrors";
import { IUserLogin } from "../interfaces/user";
import "dotenv/config";

export const loginService = async ({
  email,
  password,
}: IUserLogin): Promise<{
  token: string;
}> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Email or password invalid", 401);
  }

  const passMatch = await compare(password, user.password);

  if (!passMatch) {
    throw new AppError("Email or password invalid", 401);
  }

  const token = jwt.sign(
    {
      email: user.email,
      isActive: user.isActive,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );
  return { token };
};
