import { Router } from "express";
import userController from "../controllers/userController.js";
import userValidator from "../validators/userValidator.js";
const userRouter = Router();
userRouter.post("/signup", userValidator.createUser, userController.createUser);
userRouter.put("/forget-password", userController.forgetPassword);
userRouter.post("/login", userController.logIn);
export default userRouter;