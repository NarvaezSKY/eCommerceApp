import User from '../models/userModel.js'

export const getAllUsers=async(req,res)=>{

    const users=await User.find()
    res.send(users)

}