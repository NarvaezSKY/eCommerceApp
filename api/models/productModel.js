import mongoose, { Schema } from "mongoose";

const Product=new Schema(
    {
        productName:{type:String},
        productDetails:{type:String},
        productPrice:{type:Number},
        productImage:{type:String}
    } ,
    {
        timestamps:true
    } 

)

export default mongoose.model('Product', Product);