import Joi from "joi";


export const productDao = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.boolean().required(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
    thumbnails: Joi.string(),
    
})

