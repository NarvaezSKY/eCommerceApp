import { createToken } from '../middlewares/jwt.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export const getAllUsers=async(req,res)=>{
    try {
        
        const users=await User.find()
        res.send(users)

    } catch (error) {
        console.error(error)
    }
}

export const getUser=async(req,res)=>{
    try {
        const user=await User.find({_id:req.params.id})
        if (!user) return res.status(200).send("user does not exist")

        res.json(user)
    } catch (error) {
        res.status(200).json({error})
    }
}

export const editUser=async(req,res)=>{

    try {
        const userEdit=await User.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        })
        if (!userEdit) return res.status(200).send('user does not exist')

        res.status(200).json({userEdit})

    } catch (error) {
        res.status(400).json({error})
    }
}

export const deleteUser=async(req,res)=>{

    try {
        const userFound=await User.findByIdAndDelete(req.params.id, req.body,{
            new:true
        })

        if (!userFound) return res.status(400).send("user does not exist")

        res.json(userFound)

    } catch (error) {
        res.status(200).json({message:`${error}`})
    }
}

export const registerUser=async(req,res)=>{
    
    try {
        const {username, password}=req.body

        if (!req.body.username || !req.body.password) return res.status(400).send("missing username/password in validation prompts")
        const passhash= await bcrypt.hash(password, 10)

        const newUser=new User({
            username,
            password: passhash
        });
    
        const savedUser=await newUser.save();

        const token= await createToken({id:savedUser._id})
        res.cookie('token', token)

        res.status(200).json({savedUser})
    } 
     catch (error) {
        res.status(500).send(error)
    }
}


export const loginUser=async(req,res)=>{
    const {username, password}=req.body

    try {
        
        const userFound= await User.findOne({username})
        if (!userFound) return res.status(400).send(`user does not exist`)

        const match= await bcrypt.compare(password, userFound.password);
        if (!match) return res.status(400).json({message: "incorrect password mai frei"})

        const token= await createToken({id:userFound._id})
        res.cookie('token', token)

        res.status(200).json({userFound})
    } 
     catch (error) {
        res.status(500).send(error)
    }
}

export const logoutUser=(req,res)=>{
    res.cookie('token', "",{
        expires: new Date(0)
    })
    return res.status(200).json({message:"Bye papu"})
}

