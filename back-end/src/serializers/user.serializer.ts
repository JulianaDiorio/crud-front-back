import * as yup from "yup";
import { IUserCreate, IUserRequest } from "../interfaces/user";

export const userSerializer: yup.ObjectSchema<any> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  date_birth: yup.string().required(),
  avatar: yup.string().required(),
  isActive: yup.boolean().notRequired(),
  password: yup.string().required(),
});

export const userWithoutPasswordSerializer: yup.ObjectSchema<any> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().required(),
    email: yup.string().required(),
    date_birth: yup.string().required(),
    avatar: yup.string().required(),
    isActive: yup.boolean().notRequired(),
  });
export const allUsersWithoutPassword = yup.array(userWithoutPasswordSerializer);
