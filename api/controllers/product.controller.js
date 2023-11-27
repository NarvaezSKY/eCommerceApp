import Product from "../models/productModel.js";


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

export const uploadProduct=async(req,res)=>{
    const {productName, productDetails, productPrice}=req.body

    try {
        const newProduct= new Product({
            productName,
            productDetails,
            productPrice
        })
    
        const productSaved=await newProduct.save()
        res.status(200).json({productSaved})

    } catch (error) {
        res.status(500).json({message:`ERROR! ${error}`})
    }

}

export const updateProduct=async(req,res)=>{
    try {
        const productEdit =  await Product.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })
    
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