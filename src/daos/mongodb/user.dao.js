import { UserModel } from "./models/user.model.js"


class UserManager{
    //Obtener users
    async getUsers(){
        return await UserModel.find({})
    }
    //Agregar user
    async addUser(user){
        
        return  await UserModel.create(user)
    }
    //Devuelve user por code
    async getUserByEmail(email){
        
        return await UserModel.find({email})
    }
    //Agregar cart
    async addCartToUser(email, cart_id){
        try {
            const user = await this.getUserByEmail(email)
            const resp = await UserModel.findByIdAndUpdate( user[0]._id, {cart: cart_id}, {new: true});
            console.log("addcarttouser", resp);
            console.log("user", user);
            console.log("cartid", cart_id);
            
            
            return resp
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const UserDaoMongoDB = new UserManager()