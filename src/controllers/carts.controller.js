import * as services from '../services/carts.service.js'

export const addCart = async(req, res)=>{
    try{
        res.status(200).json(await services.addCart()) 
    }
    catch(error){
        console.log(error);
        res.status(404).json({msj:"error"})
    }
}
export const getCartProductsById =  async (req, res)=>{
    const {cid} = req.params;
    try{
        const cart = await services.getCartProductsById(cid)
        if(cart != null){
            res.status(200).json(cart)
        }else{
            res.status(404).send("El cart no existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
}

export const addProductToCart =  async (req, res)=>{
    const {cid, pid} = req.params;
    const {quantity} = req.query;
    try{
            const cart = await services.addProductToCart(cid, pid, Number(quantity))
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    catch(error){
        res.status(404).json({msj:"error"})
    }
}

export const removeProductOfCartById =  async (req, res)=>{
    const {cid, pid} = req.params;
    try{
            const cart = await services.removeProductOfCartById(cid, pid)
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    catch(error){
        res.status(404).json({msj:"error"})
    }
}
export const updateCartById =  async (req, res)=>{
    const {cid} = req.params;
    const obj = req.body;
    console.log("controller", obj);
    try{
        const cart = await services.updateCartById(cid, obj)
        if(cart != null){
            res.status(200).json(cart)
        }else{
            res.status(404).send("El cart no existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
}

export const updateProductQuantityOfCartById =  async (req, res)=>{
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    try{
            const cart = await services.updateProductQuantityOfCartById(cid, pid, quantity)
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    catch(error){
        res.status(404).json({msj:"error"})
    }
}

export const deleteAllProductsOfCart =  async (req, res)=>{
    const {cid} = req.params;
    try{
            const cart = await services.deleteAllProductsOfCart(cid)
            if(cart != null){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    catch(error){
        res.status(404).json({msj:"error"})
    }
}
