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
    
}

export const UserDaoMongoDB = new UserManager()