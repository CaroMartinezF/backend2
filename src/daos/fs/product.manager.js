import fs from 'fs'
import {v4 as uuidv4} from "uuid"

class ProductManager {
    constructor(path){
        this.path = path
    }

    //OBTENER PRODUCTOS
    async getProducts (limit = undefined){
        if (fs.existsSync(this.path)){
            let products = await fs.promises.readFile(this.path, 'utf-8')
            products = JSON.parse(products)
            if (limit != undefined) {
                products = products.slice(0, limit)
            }
            console.log("products del get",products);
            return products
        } else return []
    } 
     //OBTENER PRODUCTO POR ID
    async getProductById(id){
        if(fs.existsSync(this.path)){
            const products = await this.getProducts()
            const index = products.findIndex( (prod) => {return prod.id === id})
            if(index != -1){
                console.log("Producto obtenido")
                return products[index]
            }
        }
        console.log("El producto no existe")
        return -1
    }
     //AGREGAR PRODUCTOS
    async addProduct(productToAdd){
        let products = []
        let id = uuidv4()
        let newProduct = productToAdd
        
        if(fs.existsSync(this.path)){                                               
            products = await this.getProducts()
            //Para chequear si el id existe 
            while(products.some((prod)=>{return prod.id === id})){
                id= uuidv4();
                console.log("generando");
            }
        }
        newProduct["id"]=id;
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        console.log("Se Agrego el nuevo Producto");
        return newProduct
    }

    //BORRAR PRODUCTO
    async deleteProduct(id){
        let products = await this.getProducts()

        if (products.some((prod)=> { return prod.id === id})) {
            const index = products.findIndex((prod) => prod.id === id)
            products.splice(index, 1)

            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log("producto eliminado");
        } else {
            console.log("Producto no existe");
            return -1
        }
    }

    //ACTUALIZAR PRODUCTO
    async updateProduct(id, productToUpdate){
        let products = await this.getProducts()
        let productToUpdateSinId = productToUpdate
        delete productToUpdateSinId.id
        let productReturn = {}
        
        if (products.some((prod)=>{return prod.id === id})){
            products = products.map((prod) =>{
                if(prod.id === id) {
                    productReturn = {...prod, ...productToUpdateSinId}
                    return (productReturn)
                } else {
                    return prod
                }
            })

            await fs.promises.writeFile(this.path, JSON.stringify(products))

            console.log("Se actualizó el producto");
            return (productReturn)
        } else {
            console.log("El producto no existe");
            return -1
        }

    }
}



export const productMgr = new ProductManager("./productManager/products.json")


const prueba = async () => {
    //const products = await productMgr.getProducts()
    //console.log(products)
    //await productMgr.getProductById(2) 
    // await productMgr.addProduct({name: "pollera"})
    // await productMgr.deleteProduct(5)
    //await productMgr.updateProduct(3, {id: 5, name: "compu", color: "negra"})
}
//prueba()




