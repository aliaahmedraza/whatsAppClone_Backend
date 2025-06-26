import { Router } from "express";
import userRouter from "./userRouter.js";
import twilioRouter from "./twilioRouter.js";
const allRouters = Router();
allRouters.use(userRouter);
allRouters.use(twilioRouter);
export default allRouters;