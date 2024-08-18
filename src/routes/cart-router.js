import { Router } from "express";
/* import { cartMgr } from "../daos/fs/cartManager.js"
import { productMgr } from "../daos/fs/product.manager.js"; */
import * as controller from '../controllers/carts.controller.js'
import passport from "passport";
import { authorizationRole } from "../../middleware/auth.middleware.js";
import { cartValidator } from "../../middleware/cartValidation.middleware.js";

const router = Router();

//Agregar Cart
router.post('/', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), controller.addCart)

//Cart por Id
router.get('/:cid', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidator ,controller.getCartProductsById)

//Agregar PorductById a CartById
router.post('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidator, controller.addProductToCart)

//Borrar Productos de CartById
router.delete('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidator, controller.removeProductOfCartById)

//Actualizar Cart por ID
router.put('/:cid', controller.updateCartById)

//Actualizar quantity
router.put('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidator, controller.updateProductQuantityOfCartById)

//Borrar todos los Products del Cart
router.delete('/:cid', passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidator, controller.deleteAllProductsOfCart)

//Purchase
router.get('/:cid/purchase',passport.authenticate("jwt",{session: false}), authorizationRole(['user']), cartValidator, controller.purchase)


export default router;