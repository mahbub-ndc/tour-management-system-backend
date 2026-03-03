import { Request, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};

export const userController = {
  createUser,
  getAllUsers,
};
