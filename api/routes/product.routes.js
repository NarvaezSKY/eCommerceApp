import Express from "express";
import { deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../util/upload.js";
import { uploadFile } from "../util/uploadFile.js";
import Product from "../models/productModel.js";
const router = Express();

router.get('/products', getAllProducts);
router.get('/product/:id', getProduct);

router.post('/products', upload.fields([{name: 'productImage', maxCount:1}]),  async (req, res) => {
    
        let body=req.body
        let image=req.files.productImage
    
        if (image&&image.length>0){
            console.log(image)
            console.log('si llego la imagen jajsjsak')
            const {downloadURL}=await uploadFile(image[0])
            console.log('obtenido el URL de descarga')
            
            const newProduct=await new Product({
                productName: body.productName,
                productDetails: body.productDetails,
                productPrice: body.productPrice,
                productImage: downloadURL
            }).save()
            return res.status(200).json({
                newProduct
            })
        }
    
        res.send(`errorcito ua ${error}`)
    }
)

router.put('/product/update/:id', updateProduct);
router.delete('/product/delete/:id', deleteProduct);

export default router;
