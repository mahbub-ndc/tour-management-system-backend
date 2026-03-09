import express from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlwares/validateRequest";
import { createUserZodSchema } from "./userValidation";
import { checkAuth } from "../../middlwares/checkAuth";
const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser,
);
router.get("/get-all", checkAuth("ADMIN"), userController.getAllUsers);
router.patch("/:id", checkAuth("ADMIN"), userController.updateUser);
router.get("/:id", checkAuth("ADMIN"), userController.getSingleUser);

export const userRoutes = router;
