import { Router } from "express";
import twilioController from "../controllers/twilioController.js";
const twilioRouter = Router();
twilioRouter.post("/send-otp", twilioController.sendOTP);
twilioRouter.post("/verify-otp", twilioController.verifyOTP);
export default twilioRouter;