import fs from 'fs'
import {v4 as uuidv4} from "uuid"

class CartManager {
    constructor(path){
        this.path = path
    }

    //OBTENER CARTS
    async getCarts (){
        if (fs.existsSync(this.path)){
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } return []
    }

    //AGREGAR CART
    async addCart(){
        
        let id = uuidv4()
        const cart = {id:id, products:[]};
        let carts = []

        if(fs.existsSync(this.path)){                                               
            carts = await this.getCarts()
            
            //Para chequear si el id existe, y crear uno nuevo 
            while(carts.some((cart)=>{return cart.id === id})){
                id= uuidv4();
            }
        }
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return cart
    }

    //DEVOLVER PRODUCTOS POR ID EN CART
    async getCartProductsById(id){
        const carts = await this.getCarts()
        const index = carts.findIndex((cart) => {return cart.id===id} )
        
        if(index === -1){
            console.log("No existe el cart con ID: ", id);
            return -1
        }
        
        return carts[index].products
    }

    //AGREGAR PRODUCT AL CART
    async addProductToCart(id, prodId){

        let carts = await this.getCarts()
        
        //Buscar Cart
        const cartIndex = carts.findIndex((cart) => {return cart.id===id} )
        if(cartIndex === -1){
            console.log("No existe el cart con ID: ",id);
            return -1
        }

        //Busqueda de Product en Cart
        const productIndex = carts[cartIndex].products.findIndex((prod) => {return prod.id===prodId} )

        if(productIndex === -1){
            carts[cartIndex].products.push({id: prodId, quantity: 1})
            console.log("No existia producto, se agregó prodID: ", prodId);
        }else{
            carts[cartIndex].products[productIndex].quantity += 1;
            console.log("El producto ya existia en carrito, se agregaró 1 unidad");
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return carts[cartIndex]
    }
}

export const cartMgr = new CartManager("./cartManager/carts.json")

const prueba = async () => {
    //await cartMgr.addCart()
    //const carts = await cartMgr.getCarts()
    //console.log(carts);
    //console.log(await cartMgr.getCartProductsById("f6c5bc5a-a235-4c47-ac10-63cc8c4844f3"));
    //await cartMgr.addProductToCart("f6c5bc5a-a235-4c47-ac10-63cc8c4844f3", 2)
    //await cartMgr.addProductToCart("9e6b3984-5c4a-4e4f-841c-b82a9f7d4ac3", 1)

}
//prueba()