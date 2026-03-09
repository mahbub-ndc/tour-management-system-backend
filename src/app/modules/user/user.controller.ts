import { Request, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(
    req.params.id as string,
    req.body,
    req.user as JwtPayload,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

const getSingleUser = async (req: Request, res: Response) => {
  const user = await userService.getSingleUser(req.params.id as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User fetched successfully",
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
  updateUser,
  getSingleUser,
};
