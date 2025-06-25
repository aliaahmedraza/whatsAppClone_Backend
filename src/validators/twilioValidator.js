import Joi from "joi";
const twilioValidator = {
    sendOTP: async (req, res, next) => {
        try {
        const phoneRegExp=/^923(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9])\d{7}$/
        const sendOTPSchema = Joi.object({
            recipient:Joi.string().required().pattern(phoneRegExp).min(11).max(13).error(new Error("PhoneNumber must be a valid phone number like 923145209356")),
        })
    } catch (error) {
        
    }
}
}