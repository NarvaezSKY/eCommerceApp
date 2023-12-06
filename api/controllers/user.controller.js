import { createToken } from '../middlewares/jwt.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import {TOKEN} from '../config/tokenSecret.js'

export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find()
        res.status(200).json({users})
    
    } catch (error) {
        console.error(error)
    }

}

export const register=async(req,res)=>{
    try {
        const {username, password}=req.body
        const encriptedPassword=await bcrypt.hash(password, 10)

        const user=await new User({
            username,
            password:encriptedPassword
        }).save()

        const token=await createToken({id:user._id})
        res.cookie('token', token)
        res.status(200).json({message: "user was created succesfully", user})

    } catch (error) {
        console.error(error)
    }
}


export const login=async(req,res)=>{
    const {username, password}=req.body;
 
    try {
        const userFound=await User.findOne({username});
        if (!userFound) return res.json({message:"user not found"});
    
        const passCompare= await bcrypt.compare(password, userFound.password);
        if (!passCompare)return res.json({message:"incorrect password"});

        const token=createToken({id: userFound._id})

        res.cookie("token", token)

        res.json ({
            id:userFound._id,
            username: userFound.username,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })

    } catch (error) {
        res.status(500).json({ message: `LOGIN ERROR! ${error}` });
    }
}

export const VerifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.json({ message: "Acces denied" });
  
    jwt.verify(token, TOKEN, async (err, user) => {
      if (err) return res.json({ message: "Acces denied", err });
      const userfound = await UserSchema.findById(user.id);
      if (!userfound) return res.json({ message: "acesso no autorizado" });
      return res.json({
        id: userfound._id,
        username: userfound.username,
        email: userfound.email,
      });
    });
  };
  