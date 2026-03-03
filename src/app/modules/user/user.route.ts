import express from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlwares/validateRequest";
import { createUserZodSchema } from "./userValidation";
const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser,
);
router.get("/get-all", userController.getAllUsers);

export const userRoutes = router;
