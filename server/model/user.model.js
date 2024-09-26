
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,
        requried:true,
       
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    firstname:{
        type:String,
        
    },
   lastname:{
        type:String,
        
    },
   phone:{
        type:Number,
        
    },
    profile:{
        type:String,
        
    }

})

const Users = mongoose.model('User',UserSchema)

export default Users