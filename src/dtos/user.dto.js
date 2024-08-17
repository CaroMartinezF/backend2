import Joi from "joi";

export const userDto = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    password: Joi.string().required(),
    //cart_id: ,
    role: Joi.string().required(),
})

export const resUserDto = (user)=>{
    const responseUserData = {
        email: user.email,
        role: user.role
    }

    return responseUserData
}