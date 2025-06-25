import mongoose from "mongoose";
const { Schema } = mongoose;
const otpSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m'
  },
});
const otpModel = mongoose.model("otpModel", otpSchema);
export default otpModel;