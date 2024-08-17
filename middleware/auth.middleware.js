export function authorizationRole(roles){
    return async (req, res, next)=>{
        
    console.log("Roles a validar: ", roles);

    const {role} = req.user
    
    const pass = roles.includes((role))

    if(pass){
        next();
    }
    else{
        res.status(500).send("Usuario no autorizado")
    }
    }
}
