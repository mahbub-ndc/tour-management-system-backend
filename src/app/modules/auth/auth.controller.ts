import { Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  const user = await authService.login(req.body);
  const access_token = jwt.sign(
    { email: user.email, role: user.role, id: user._id },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "1h",
    },
  );
  const refresh_token = jwt.sign(
    { email: user.email, role: user.role, id: user._id },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("access_token", access_token, { httpOnly: true });
  res.cookie("refresh_token", refresh_token, { httpOnly: true });

  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    data: {
      email: user.email,
      access_token: access_token,
      refresh_token: refresh_token,
    },
  });
};

export const authController = {
  login,
};
