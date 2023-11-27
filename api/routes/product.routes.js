import  Express  from "express";
import { deleteProduct, getAllProducts, getProduct, updateProduct, uploadProduct } from "../controllers/product.controller.js";

const router=Express()


router.get('/products', getAllProducts)
router.get('/product/:id', getProduct)
router.post('/products', uploadProduct)
router.put('/product/update/:id', updateProduct)
router.delete('/product/delete/:id', deleteProduct)

export default router;