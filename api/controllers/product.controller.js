import Product from "../models/productModel.js";
import { uploadFile } from "../util/uploadFile.js";


export const getAllProducts=async(req,res)=>{
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.send(`ERROR! ${error}`)
    }
}

export const getProduct=async(req,res)=>{
    try {
        const foundProduct=await Product.findOne({_id:req.params.id})
        res.send(foundProduct)
    } catch (error) {
        res.send(`ERROR! ${error}`)
    }
}

export const uploadProduct = async (req, res) => {
    const body = req.body;
    const productImage = req.file;

    console.log('Inicio del controlador uploadProduct');

    try {
        if (productImage) {
            const { ref, downloadURL } = await uploadFile(productImage);

            // Guardar información del producto en la base de datos
            const newProduct = await new Product({
                productName: body.productName,
                productDetails: body.productDetails,
                productPrice: body.productPrice,
                productImage: downloadURL
            }).save();

            console.log('Producto guardado:', newProduct);
            res.status(200).json({ newProduct });
        } else {
            console.log('No se recibió la imagen');
            res.status(400).json({ message: 'No se recibió la imagen' });
        }
    } catch (error) {
        console.error('Error en el controlador uploadProduct:', error);
        res.status(500).json({ message: `ERROR! ${error.message}` });
    }
};
export const updateProduct=async(req,res)=>{
    try {
        const productEdit =  await Product.findByIdAndUpdate(req.params.id,{
            new: true
        })
        console.log(req.params)
    
        if (!productEdit) res.status(400).json({message:`product ${req.params.id} does not exist`})
    
        res.send(productEdit)
    } catch (error) {
        res.send(`ERROR! ${error}`)
    }
    
}

export const deleteProduct=async(req,res)=>{
    try {
        const deletedProduct=await Product.findByIdAndDelete(req.params.id)
        if (!deleteProduct) res.status(400).json({message:`product ${req.params.id} does not exist`})

        res.status(200).json({message:`${req.params.id} deleted succesfully`})

    } catch (error) {
        res.send(`ERROR! ${error}`)
    }
}