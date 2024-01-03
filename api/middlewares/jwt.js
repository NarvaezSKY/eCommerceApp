import { TOKEN } from "../config/tokenSecret.js";
import jwt from "jsonwebtoken";


export const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN,
            {
                expiresIn: '1d'
            },
            (error, token) => {
                if (error) reject(error)
                resolve(token)


            }
        )

    })

}