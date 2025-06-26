import { Router } from "express";
import twilioController from "../controllers/twilioController.js";
import twilioValidator from "../validators/twilioValidator.js";
const twilioRouter = Router();
twilioRouter.post("/send-otp",twilioValidator.sendOTP, twilioController.sendOTP);
twilioRouter.post("/verify-otp", twilioController.verifyOTP);
export default twilioRouter;