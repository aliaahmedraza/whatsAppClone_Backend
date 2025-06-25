import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const userController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, password } = req.body;
      if (!firstName || !lastName || !phoneNumber || !password) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields",
        });
      }
      const existingUser = await userModel.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        firstName,
        lastName,
        phoneNumber,
        password: hashedPassword,
      });
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  logIn: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      if (!phoneNumber || !password) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields",
        });
      }
      const user = await userModel.findOne({ phoneNumber });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Any user with this phoneNumber does not exist",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      dotenv.config();
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  forgetPassword: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "Please provide your phone number",
        });
      }
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Please provide your new password",
        });
      }
      const user = await userModel.findOne({ phoneNumber });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User with this phone number does not exist",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
export default userController;
