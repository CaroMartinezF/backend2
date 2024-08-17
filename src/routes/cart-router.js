import { Router } from "express";
/* import { cartMgr } from "../daos/fs/cartManager.js"
import { productMgr } from "../daos/fs/product.manager.js"; */
import * as controller from '../controllers/carts.controller.js'
import passport from "passport";
import { authorizationRole } from "../../middleware/auth.middleware.js";

const router = Router();

//Agregar Cart
router.post('/', controller.addCart)

//Cart por Id
router.get('/:cid', controller.getCartProductsById)

//Agregar PorductById a CartById
router.post('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), controller.addProductToCart)

//Borrar Productos de CartById
router.delete('/:cid/products/:pid', controller.removeProductOfCartById)

//Actualizar Cart por ID
router.put('/:cid', controller.updateCartById)

//Actualizar quantity
router.put('/:cid/products/:pid', controller.updateProductQuantityOfCartById)

//Borrar todos los Products del Cart
router.delete('/:cid', controller.deleteAllProductsOfCart)

//Purchase
router.get('/:cid/purchase',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), controller.purchase)


export default router;