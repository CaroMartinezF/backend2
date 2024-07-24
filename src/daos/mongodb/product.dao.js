import { ProductModel } from "./models/productModel.js"


class ProductManager{
    //Obtener Productos
    async getProducts(limit = 10, page = 1, sort , query= undefined, category, stock){
        
        const queryFilter = {} 
        query ? queryFilter.title= query : null
        category ? queryFilter.category= category : null
        stock ? queryFilter.stock= {$gt: stock} : null
        console.log(queryFilter);
        let sortOrder= {}
        if(sort){
            sortOrder.price = sort === "asc" ? 1 : sort === "des" ? -1 : null
        }
        
        return await ProductModel.paginate(queryFilter, {page, limit, sort: sortOrder})
    }
    //Obtener Producto Por ID
    async getProductById(id){
        const prod = await ProductModel.findById(id)
        return prod
    }
    //Agregar Producto
    async addProduct(prodToAdd){
        const prod = await ProductModel.create(prodToAdd)
        return prod
    }
    //Actualizar Producto
    async updateProduct(prodId, prodToUpdate){
        try {
            
            const resp = await ProductModel.findByIdAndUpdate(prodId, prodToUpdate, {new: true});
            console.log(resp);
            return resp
            
        } catch (error) {
            console.log(error);
        }
    }
    //Borrar Producto
    async deleteProduct(prodId){
        try {
            const resp = await ProductModel.findByIdAndDelete(prodId);
            console.log(resp);
            return resp
        } catch (error) {
            console.log(error);
        }
}
}

export const ProductDaoMongoDB = new ProductManager();

