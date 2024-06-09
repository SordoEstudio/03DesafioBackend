import { Router } from "express";
import * as controller from '../controllers/cartControllers.js'

const router = Router();

router.post("/", controller.create)

router.get("/:cId", controller.getById) 

router.post("/:cId/products/:pId", controller.addProductToCart) 

router.delete("/:cId/products/:pId", controller.removeProductToCart)

router.put("/:cId/products/:pId", controller.updateProductQuantity)

router.put("/:cId", controller.update) 

export default router;
