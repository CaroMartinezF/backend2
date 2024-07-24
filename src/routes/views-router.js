import { Router } from "express";
import { productMgr } from "../daos/fs/product.manager.js"

const router = Router()

router.get("/", async (req, res) => {
    const products = await productMgr.getProducts()
    
    res.render("home", {products})
})

router.get("/realtimeproducts", (req, res) => {

    res.render("realTimeProducts")
})

export default router