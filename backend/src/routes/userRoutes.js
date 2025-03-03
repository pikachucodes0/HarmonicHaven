import express from "express";
import { authenticateToken } from "../middleware/token-middleware.js";
import User from "../model/userSchema.js";
import {
  editProfile,
  getUser,
  registerUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.put("/profile", authenticateToken, editProfile);
userRouter.get("/getProfile/:userId", getUser);

export default userRouter;
