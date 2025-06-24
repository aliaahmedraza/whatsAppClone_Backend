import { Router } from "express";
import userRouter from "./userRouter.js";
const allRouters = Router();
allRouters.use(userRouter);
export default allRouters;