/* eslint-disable @typescript-eslint/no-namespace */

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpstatus from "http-status";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        role: string;
      };
    }
  }
}

export const checkAuth =
  (...authRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.access_token;
      // console.log("token from auth", token);

      if (!token) {
        return res
          .status(httpstatus.UNAUTHORIZED)
          .json({ message: "You are not authenticated!" });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload & { id: string; role: string };

      // Role-based authorization (optional)
      if (authRoles.length && !authRoles.includes(decoded.role)) {
        return res
          .status(httpstatus.FORBIDDEN)
          .json({ message: "You are not authorized!" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
