import Joi from "joi";
const twilioValidator = {
  sendOTP: async (req, res, next) => {
    try {
      const phoneRegExp = /^923([0-4][0-9])\d{7}$/;
      const sendOTPSchema = Joi.object({
        recipient: Joi.string()
          .required()
          .pattern(phoneRegExp)
          .min(11)
          .max(13)
          .error(
            new Error(
              "PhoneNumber must be a valid phone number like 923145209356"
            )
          ),
      });
        const { error } = sendOTPSchema.validate(req.body);
        if (error) {
          return res.status(400).json({
            success: false,
            message: error.details[0].message,
          });
        }
    } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error during validation",
          error: error.message,
        });
    }
    next();
  },
};
export default twilioValidator;