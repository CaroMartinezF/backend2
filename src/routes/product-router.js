import { Router } from "express";
//import { productMgr } from "../daos/fs/product.manager.js";
import { productValidator } from "../../middleware/productValidator.js";
import { validarPut } from "../../middleware/productValidator.js";
import * as controller from '../controllers/products.controller.js'
import passport from 'passport';
import { authorizationRole } from "../../middleware/auth.middleware.js";

const router = Router();

//Devolver todos los Productos
router.get('/', controller.getProducts)

// Devolver Producto por ID
router.get('/:pid', controller.getProductById)

//Agregar Producto
router.post('/', passport.authenticate("jwt",{session: false}), authorizationRole(['admin']), productValidator, controller.addProduct)

//Actualizar Producto
router.put('/:pid', passport.authenticate("jwt",{session: false}), authorizationRole(['admin']), validarPut, controller.updateProduct)

//Borrar Producto
router.delete('/:pid', passport.authenticate("jwt",{session: false}), authorizationRole(['admin']), controller.deleteProduct)

export default router