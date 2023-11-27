import mongoose from "mongoose";

const URI='mongodb+srv://Cristian:1234@clustertal.nubhn3b.mongodb.net/ecomerce';

export const connection=()=>{mongoose.connect(URI)
.then(()=>{
    console.log('db connected succesfully');
}).catch((error)=>{
    console.error(error);
})};