import jwt from 'jsonwebtoken'
import { TOKEN } from '../config/tokenSecret.js'

export const authRequired=(req, res, next)=>{
    const {token}=req.cookies
    
    if (!token) return res.status(401).json({message: "Token not found"})

    jwt.verify(token, TOKEN, (err, user)=>{
        if (err) return res.status(403).json({message:"invalid token"})

        req.user=user
        next()
    })

    

}