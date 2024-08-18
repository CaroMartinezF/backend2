import Joi from "joi";
import { getUserByEmail } from "../services/carts.service.js";

export const userDto = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    password: Joi.string().required(),
    //cart_id: ,
    role: Joi.string().required(),
})

export const resUserDto = async (user)=>{
    const dbUser = await getUserByEmail(user.email)
    const responseUserData = {
        email: user.email,
        role: user.role
    }

    if (dbUser[0].cart) {
        responseUserData.cart = dbUser[0].cart
    }
    console.log(responseUserData);
    
    return responseUserData
}