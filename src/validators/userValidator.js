import Joi from "joi";
const userValidator = {
  createUser: (req, res, next) => {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string()
          .pattern(/^923([0-4][0-9])\d{7}$/)
          .min(11)
          .max(13)
          .required(),
        password: Joi.string()
          .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
          )
          .min(8)
          .required(),
      });
      const { error } = schema.validate(req.body);
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
export default userValidator;
