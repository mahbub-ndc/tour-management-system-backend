import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  //const { email, ...rest } = payload;
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new Error("User already exist");
  }
  const authProvider: IAuthProvider = {
    provider: "Credential",
    providerId: payload.email as string,
  };
  payload.auths = [authProvider];

  const hashPassword = await bcrypt.hash(payload.password as string, 10);

  payload.password = hashPassword;

  const user = await User.create(payload);

  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const userService = {
  createUser,
  getAllUsers,
};
