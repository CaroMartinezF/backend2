import { getUserByEmail } from "../src/services/carts.service.js";

export const cartValidator = async (req, res, next) => {

    const {cid} = req.params

    const user = req.user;
    
    try{
        const dbUser = await getUserByEmail(user.email);

        if(dbUser[0].cart == cid) {
            next()
        } else{
        return res.status(404).send(`El cart ${cid} no es el del User. El cart de este usuario es ${dbUser[0].cart}`)
        }
        }
        catch(error){
            console.log(error);
        }
}