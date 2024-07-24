import { CartModel } from "./models/cartModel.js";

class CartManager{
    //Obtener Carts
    async getCarts(){
        return await CartModel.find({})
    }
    //Agregar Cart
    async addCart(){
        const resp = await CartModel.create({products:[]})
        return resp
    }
    //Cart por ID
    async getCartById(cartId){
        return await CartModel.findById(cartId)//.populate("products.product");
    }
    //Productos del carrito por ID
    async getCartProductsById(cartId){
        return await CartModel.findById(cartId).populate("products.product");
    }

    //Remover Producto de Cart
    async removeProductOfCartById(cartId, prodId){
        return await CartModel.findByIdAndUpdate(
            { _id: cartId },
            { $pull: { products: { product: prodId } } },
            { new: true }
        )
    }

    //Cart por ID y producto existe
    async existProdInCart(cartId,prodId){
        console.log("cartId:",cartId , "prodId", prodId);
        try {
            return await CartModel.findOne({
                _id: cartId,
                products: { $elemMatch: { product: prodId } }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar Producto a Cart
    async addProductToCart(cartId, prodId,quantity){
        quantity = quantity ? quantity: 1
        //Existe Cart
        const cart = await this.getCartById(cartId)
        
        if(cart != null){
            
            //Existe Product en Cart
            const existProd= await this.existProdInCart(cartId, prodId)
            console.log("Existe el producto: ",existProd);

            if(existProd){
                let index = existProd.products.findIndex(prod =>{return prod.product.toString() === prodId})
                console.log("index: ",index);
                return await CartModel.findOneAndUpdate(
                        { _id: cartId, 'products.product': prodId },
                        { $set: { 'products.$.quantity': existProd.products[index].quantity + quantity } },
                        { new: true }
                    );
            }else{
                return await CartModel.findByIdAndUpdate(
                    cartId,
                    { $push: { products: { product: prodId, quantity: quantity } } },
                    { new: true }
                )
            }
        }
        return null
    }
    //Actualizar Cart por ID
    async updateCartById(cartId, obj){
        console.log(obj);
        return await CartModel.findByIdAndUpdate(cartId,{$set: {products: obj}},  {new:true})
        
    }
    //Actualizar cantidad de producto en cart
    async updateProductQuantityOfCartById(cartId, prodId, quantity =1){
        //Para chequear si existe el cart
        const cart = await this.getCartById(cartId)
        
        if(cart != null){
            
            //Existencia del Product en Cart
            const existProd= await this.existProdInCart(cartId, prodId)
            
            if(existProd){
                let index = existProd.products.findIndex(prod =>{return prod.product.toString() ===prodId})
                console.log("index: ",index);
                return await CartModel.findOneAndUpdate(
                        { _id: cartId, 'products.product': prodId },
                        { $set: { 'products.$.quantity': quantity } },
                        { new: true }
                    );
            }
        }
        return null
    }
    //Borrar todos los productos de cart
    async deleteAllProductsOfCart(cartId){
    return await CartModel.findByIdAndUpdate(cartId,{$set: {products: []}},  {new:true})
    }
}

export const CartDaoMongoDB = new CartManager()



import { initMongoDB } from "../../db/database.js";

//Conexion con DB Mongo

//initMongoDB()

const test = async()=>{
    try {
        //console.log(await CartDaoMongoDB.getCartProductsById("")); 
        //console.log(await CartDaoMongoDB.addProductToCart("","")); 
        //console.log(await CartDaoMongoDB.removeProductOfCartById("","")); 
    } catch (error) {
        console.log(error);
    }
}

//test()
