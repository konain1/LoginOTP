import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export function generateJWT(payload) {
    const token = jwt.sign(payload, process.env.SECRET || 'secret');
    console.log('token ',token)
    return token;
}

export async function verifyJWT(req,res,next){
        const token = req.headers.authorization.split(' ')[1];

        if(!token) return res.status(401).json({msg:'un-Authorize'})

       
    const decoded = jwt.verify(token,process.env.SECRET || 'secret')

   console.log(decoded)
   req.user = decoded
   next()
}

export function localVariables(req,res,next){

    req.app.locals = {
       
        Otp:null,
        resetSession:false
    }
    
    next()
}