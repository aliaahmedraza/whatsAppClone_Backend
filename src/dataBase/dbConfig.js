import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL =
  process.env.DATABASEURL
const connectDB = async () => {
  await mongoose
    .connect(URL)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection failed:", error));
};
export default connectDB;