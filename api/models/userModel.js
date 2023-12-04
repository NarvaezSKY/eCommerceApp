import mongoose, { Schema } from "mongoose";

const user= new Schema({
    username:{type: String},
    password:{type: String}


},
{
    timestamps:true
})

export default mongoose.model('User', user)