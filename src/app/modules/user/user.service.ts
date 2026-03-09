import { JwtPayload } from "jsonwebtoken";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import AppError from "../../errorHelper/AppError";
import httpStatus from "http-status";

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

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload,
) => {
  if (payload.password) {
    const hashPassword = await bcrypt.hash(payload.password as string, 10);
    payload.password = hashPassword;
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  const user = await User.findOneAndUpdate({ _id: id }, payload, { new: true });
  return user;
};

const getSingleUser = async (id: string) => {
  const user = await User.findOne({ _id: id });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const userService = {
  createUser,
  getAllUsers,
  updateUser,
  getSingleUser,
};
