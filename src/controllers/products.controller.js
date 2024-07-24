import * as services from '../services/products.service.js'

export const getProducts = async(req, res)=>{
    const {limit, page, sort, query, category, stock} = req.query;
    try{
        const respService = await services.getProducts(limit, page, sort, query, category, stock)
        let stringPrevPage= `http://localhost:8080/api/products/`
        let stringNextPage= `http://localhost:8080/api/products/`

        let paramExists=false;


        if(limit){
            paramExists=true
            stringPrevPage+=`?limit=${limit}`
            stringNextPage+=`?limit=${limit}`
        }

        if(sort){
            if(!paramExists){
                stringPrevPage+=`?sort=${sort}`
                stringNextPage+=`?sort=${sort}`
                paramExists=true
            }else{
                stringPrevPage+=`&sort=${sort}`
                stringNextPage+=`&sort=${sort}`
            }
        }

        if(query){
            if(!paramExists){
                stringPrevPage+=`?query=${query}`
                stringNextPage+=`?query=${query}`
                paramExists=true
            }else{
                stringPrevPage+=`&query=${query}`
                stringNextPage+=`&query=${query}`
            }
        }

        if(category){
            if(!paramExists){
                stringPrevPage+=`?category=${category}`
                stringNextPage+=`?category=${category}`
                paramExists=true
            }else{
                stringPrevPage+=`&category=${category}`
                stringNextPage+=`&category=${category}`
            }
        }

        if(stock){
            if(!paramExists){
                stringPrevPage+=`?stock=${stock}`
                stringNextPage+=`?stock=${stock}`
                paramExists=true
            }else{
                stringPrevPage+=`&stock=${stock}`
                stringNextPage+=`&stock=${stock}`
            }
        }

        if(respService.totalPages > 1){
            
            if(!paramExists){
                stringPrevPage+=`?page=${respService.page -1}`
                stringNextPage+=`?page=${respService.page +1}`
                paramExists=true
            }else{
                stringPrevPage+=`&page=${respService.page -1}`
                stringNextPage+=`&page=${respService.page +1}`
            }
            if(respService.page===1){
                stringPrevPage= null
            }
            if(respService.page===respService.totalPages){
                stringNextPage= null
            }
        }else{
            stringPrevPage= null
            stringNextPage= null
        }
        console.log("prev: ",stringPrevPage);
        console.log("nexy: ",stringNextPage);

        let resp ={
            status:         "success",
            paylaod:        respService.docs,
            totalPages:     respService.totalPages,
            prevPage:       respService.prevPage,
            nextPage:       respService.nextPage,
            page:           respService.page,
            hasPrevPage:    respService.hasPrevPage,
            hasNextPage:    respService.hasNextPage,
            prevLink:       stringPrevPage,
            nextLink:       stringNextPage,

        }
        res.status(200).json( resp)
    }
    catch(error){
        let resp ={
            status: "error",
            paylaod: null
        }
        res.status(404).json(resp)
    }
}

export const getProductById =  async(req, res)=>{
    const {pid} = req.params;
    try{
        const product = await services.getProductById(pid);
        if(product != null){
            res.status(200).json(product)
        }else{
            res.status(404).send("El producto no existe")
        }
        
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
}

export const addProduct =  async(req, res)=>{
    
    //Para que no se agreguen campos adicionales
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;

    let newProductValues = {}
    if(title != undefined)         {newProductValues["title"]       = title}
    if(description != undefined)   {newProductValues["description"] = description}
    if(code != undefined)          {newProductValues["code"]        = code}
    if(price != undefined)         {newProductValues["price"]       = price}
    if(status != undefined)        {newProductValues["status"]      = status}
    if(stock != undefined)         {newProductValues["stock"]       = stock}
    if(category != undefined)      {newProductValues["category"]    = category}
    if(thumbnails != undefined)      {newProductValues["thumbnails"]    = thumbnails}

console.log(newProductValues);
    try{
        res.status(200).json( await services.addProduct(newProductValues))
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
/*     const socketProducts =  await ProductMgr.getProducts()
    socketServer.emit('getProducts', socketProducts) */
}

export const updateProduct =   async(req, res)=>{
    const {pid} = req.params
    
    //Para que no se agreguen campos adicionales
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;


    let newProductValues = {}
    if(title != undefined)         {newProductValues["title"]       = title}
    if(description != undefined)   {newProductValues["description"] = description}
    if(code != undefined)          {newProductValues["code"]        = code}
    if(price != undefined)         {newProductValues["price"]       = price}
    if(status != undefined)        {newProductValues["status"]      = status}
    if(stock != undefined)         {newProductValues["stock"]       = stock}
    if(category != undefined)      {newProductValues["category"]    = category}
    if(thumbnails != undefined)      {newProductValues["thumbnails"]    = thumbnails}


    try{
        console.log("newProdValues",newProductValues);
        const productoActualizado = await services.updateProduct(pid, newProductValues)
        if(productoActualizado != null){
            res.status(200).json(productoActualizado)
        }else{
            res.status(404).send("El Producto No Existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
/*     const socketProducts =  await ProductMgr.getProducts()
    socketServer.emit('getProducts', socketProducts)
*/
}

export const deleteProduct =  async(req, res)=>{
    const {pid} = req.params
    console.log("pid",pid);
    try{
        const status = await services.deleteProduct(pid)
        if (status != null){
            res.status(200).json("Producto Eliminado")
        }else{
            res.status(404).send("El producto no existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
/*     const socketProducts =  await ProductMgr.getProducts()
    socketServer.emit('getProducts', socketProducts) */
}