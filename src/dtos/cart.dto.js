import Joi from "joi";

export const cartDao = Joi.object({
    products: Joi.array().items(
        joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().required(),
        })
    )
})
