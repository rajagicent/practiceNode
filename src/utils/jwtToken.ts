import jwt from "jsonwebtoken";


const jwtSecret = process.env.JWT_SECRET!


if(!jwtSecret || jwtSecret.length < 32) {
    throw new Error('FATAL: secret must define')
}

 export const createToken = (user:{
    id:string;
    email:string;
    name: string;
    role: string
}) =>{
    const PAYLOAD = {
        email: user.email,
        name: user.name,
        role: user.role
    }

    const algorithem:jwt.SignOptions = {
        algorithm: 'HS256' as jwt.Algorithm,
        expiresIn: '15m',
        subject: user.id
    }

    return jwt.sign(PAYLOAD, jwtSecret, algorithem)

}


export const verifyToken = (token:string)=>{
    const verifyOptions:jwt.VerifyOptions ={
        algorithms: ['HS256'] 
    }

    try {
       const details =  jwt.verify(token,jwtSecret,verifyOptions) as {
        email: string;
        name: string; 
        role: string
       }
       if(!details){
        throw new Error("details are missing")
       }
       return details

    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            throw new Error("Token has expired")
        }

        if(error instanceof jwt.JsonWebTokenError){
            throw new Error('Invalid authentication token')
        }

        throw new Error("Authentication failed")
    }
}