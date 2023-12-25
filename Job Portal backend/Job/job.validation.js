import Joi from "joi";


export const jobSchema = Joi.object({
        name: Joi.string().required().min(2).max(55).trim(),
        company: Joi.string().required().min(2).max(55).trim(),
        description: Joi.string().required().min(20).max(300).trim(),
        salary: Joi.number().min(0).required(),
        quantity: Joi.number().integer().required().min(1),
        validDate:Joi.date().required(),
        category: Joi.string().required().trim().valid(
            "teaching",
            "medical",
            "IT",
            "finance",
            "sales",
            "marketing",
            "transport",
            "hotel",
            "services",
            "maintenance",
    ),
    })


// validate query
   export  const getAllJobsValidation = Joi.object({
        page: Joi.number().integer().min(1).required(),
        limit: Joi.number().integer().min(1).required()
    })