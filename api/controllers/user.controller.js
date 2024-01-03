import User from '../models/userModel.js'

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

export const registerUser=async(req,res)=>{
    
    try {
        const {username, password}=req.body

        if (!req.body.username || !req.body.password) return res.status(400).send("missing username/password in validation prompts")

        const newUser=new User({
            username,
            password
        });
    
        const savedUser=await newUser.save();
        res.status(200).json({savedUser})
    } 
     catch (error) {
        res.status(500).send(error)
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