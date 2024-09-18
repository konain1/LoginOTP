import { Router } from "express";
const route = Router()





// post method

route.post('/register',(req,res)=>{

    res.json({msg:'register route'})

})

route.post('/registermail',(req,res)=>{
    res.json({msg:'register mail'})
})

route.post('/authenticate',(req,res)=>{
    res.json({msg:'authenticate'})
})

route.post('/login',(req,res)=>{
    res.json({msg:'login'})
})


// get method

route.route('/user:username').get((req,res)=>{res.json({msg:'username'})})
route.route('/generateOtp').get((req,res)=>{res.json({msg:"GenerateOTP"})})
route.route('/verifyOtp').get((req,res)=>res.json({msg:'VerifyOTP'}))
route.route('/createResetSession').get((req,res)=>{res.json({msg:'createResetSession'})})




// put method
route.route('/updateUser').put((req,res)=>{res.json({mgs:"put updateUser"})})
route.route('/updatePassword').put((req,res)=>{res.json({mgs:"put updatePassword"})})



export default route