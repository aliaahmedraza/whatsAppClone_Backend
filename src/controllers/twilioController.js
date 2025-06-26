import twilio from "twilio";
import dotenv from "dotenv";
import otpModel from "../models/otpModel.js";
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, authToken);
const twilioController = {
  sendOTP: async (req, res) => {
    try {
      const { recipient } = req.body;
      const otp = Math.floor(1000 + Math.random() * 9000);
      if (!recipient) {
        return res
          .status(400)
          .json({ success: false, message: "Recipient is required" });
      }
      //   await client.messages.create({
      //     body: `Your OTP is: ${otp}`,
      //     from: twilioNumber,
      //     to: `+${recipient}`,
      //   });
      await otpModel.create({
        phoneNumber: recipient,
        otp: otp,
      });
      res
        .status(200)
        .json({ success: true, message: "OTP sent successfully" });
      console.log("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
  },
  verifyOTP: async (req, res) => {
    try {
      const { recipient, otp } = req.body;
      const storedOTPData = await otpModel.findOne({ phoneNumber: recipient });
      if (!recipient) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required",
        });
      }

      if (!otp) {
        return res.status(400).json({
          success: false,
          message: "OTP is required",
        });
      }

      const cleanedOTP = otp.replace(/\D/g, "");
      if (!/^\d{4}$/.test(cleanedOTP)) {
        return res.status(400).json({
          success: false,
          message: "OTP must be exactly 4 digits",
        });
      }
      if (!storedOTPData) {
        return res.status(400).json({
          success: false,
          message: "OTP expired or invalid. Please request a new one.",
        });
      }
      if (storedOTPData.otp === cleanedOTP) {
        return res.status(200).json({
          success: true,
          message: "OTP verified successfully",
          data: {
            phoneNumber: recipient,
            verifiedAt: new Date().toISOString(),
          },
        });
          
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during OTP verification",
      });
    }
  },
};
export default twilioController;
