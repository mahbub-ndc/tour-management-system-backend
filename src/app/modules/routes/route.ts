import express from "express";
import { userRoutes } from "../user/user.route";
export const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
