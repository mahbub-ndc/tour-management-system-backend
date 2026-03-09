import express from "express";
import { userRoutes } from "../user/user.route";
import { authRoutes } from "../auth/auth.route";

export const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
