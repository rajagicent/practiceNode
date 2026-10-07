// import  {Request, Response, NextFunction} from 'express'
// import { verifyToken } from '../utils/jwtToken.js'
// import type { AuthUser } from "../types/auth.js";


// export function validateHeader(req:Request, res:Response, next:NextFunction){

//     const authHeader = req.header('authorization')

//     const token = authHeader ? authHeader.split(' ')[1] : null

//     if(!token){
//         return res.status(401).json({message: "failed to verify"})
//     }

    

//     try {
        
//         const decoded = verifyToken(token)

//         req.user = decoded as AuthUser

//         next()

//     } catch (error) {
//         return res.status(403).json({message:"something wrong"})
//     }

// }


import  {Request, Response, NextFunction} from 'express'
import { verifyToken } from '../utils/jwtToken.js'
import type { AuthUser } from "../types/auth.js";
import type { ROLEACCESS } from '../generated/prisma/enums.js';

export function validateHeader(allowRole: ROLEACCESS[] ){

    return(req:Request, res:Response, next:NextFunction) =>{

    const authHeader = req.header('authorization')

    const token = authHeader ? authHeader.split(' ')[1] : null

    if(!token){
        return res.status(401).json({message: "failed to verify"})
    }

    

    try {
        
        const decoded = verifyToken(token)

        
        req.user = decoded as AuthUser
        
        if(!allowRole.includes(decoded.role as ROLEACCESS)){
            return res.status(403).json({message: "you are not authorize"})
        }


        next()

    } catch (error) {
        return res.status(403).json({message:"something wrong"})
    }

}

}