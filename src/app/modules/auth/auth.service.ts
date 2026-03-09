import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";

const login = async (payload: Partial<IUser>) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordExist = await bcrypt.compare(
    payload.password as string,
    user.password as string,
  );
  if (!isPasswordExist) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const authService = {
  login,
};
