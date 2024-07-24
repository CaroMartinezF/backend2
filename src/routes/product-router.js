import { Router } from "express";
//import { productMgr } from "../daos/fs/product.manager.js";
import { productValidator } from "../../middleware/productValidator.js";
import { validarPut } from "../../middleware/productValidator.js";
import * as controller from '../controllers/products.controller.js'

const router = Router();

//Devolver todos los Productos
router.get('/', controller.getProducts)

// Devolver Producto por ID
router.get('/:pid', controller.getProductById)

//Agregar Producto
router.post('/', productValidator, controller.addProduct)

//Actualizar Producto
router.put('/:pid', validarPut, controller.updateProduct)

//Borrar Producto
router.delete('/:pid', controller.deleteProduct)

export default router