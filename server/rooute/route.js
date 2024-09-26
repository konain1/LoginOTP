import { Router } from "express";
import User from '../model/user.model.js'
import bcrypt from 'bcrypt'
import {generateJWT,verifyJWT,localVariables} from "../jwt.js";
import otpGenerator from 'otp-generator'
import sendmail from "../config/mailer.js";
const route = Router()



let localOpt = '' // temporary solution instead of req.app.locals.Otp using local variable
let localSession = false


// post method

route.post('/register',async(req,res)=>{

    let {username,email,password,profile} = req.body;

    let UsernameExists = await User.findOne({username})
    let EmailExists = await User.findOne({username})



    if(UsernameExists){
        return res.send('username already exists ')
    }
    if(EmailExists){
        return res.send('Email already exists ')
    }

    let Hashpassword = await bcrypt.hash(password,10);
    
    let newUser = new User({
        email,
        username,
        profile :profile || '',
        password:Hashpassword
    })
    await newUser.save()
    res.json({newUser})

})

route.post('/registermail',(req,res)=>{
    res.json({msg:'register mail'})
})

route.post('/authenticate',verifyJWT,async(req,res)=>{

    let userid = req.user

    let user = await User.findById(userid)

    console.log(user.email)

    res.json({user:user.email})
})

route.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const userExist = await User.findOne({ username });
        // console.log(userExist);

        if (userExist) {
            // Compare the password with the hashed password
            const matchedPassword = await bcrypt.compare(password, userExist.password);

            if (matchedPassword) {
                // Generate JWT token
                const token = generateJWT(userExist.id)

                return res.status(200).json({
                    msg: 'Logged in successfully',
                    token
                });
            } else {
                return res.status(401).json({ msg: 'Wrong password' });
            }
        } else {
            return res.status(404).json({ msg: 'User does not exist' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});




// get method


route.get('/generateOtp', localVariables,verifyJWT, async (req, res) => {

    let userid = req.user;


    req.app.locals.Otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        specialChars: false, 
        lowerCaseAlphabets: false 
    });

    let user = await User.findById(userid)

    
    localOpt = req.app.locals.Otp;  // Set local variable for temporary solution

    if(user){

        sendmail(user.email,'verification ',`verification code ${localOpt} `)
    }
    
    res.send({ msg:"you will recieve an email"});

});


route.get('/verifyOtp', localVariables, async (req, res) => {
    // Get the OTP from the query parameters (for a GET request)
    let code = req.body.code; // Use req.query instead of req.body for GET requests
    console.log('code is ',code)

    //instead of comparing req.app.locals.Otp usig local variable for temporary 
    if ( parseInt(localOpt) === parseInt(code) ) {
        localOpt = null
        req.app.locals.Otp = null,
        req.app.locals.resetSession = true
        localSession =req.app.locals.resetSession
        return res.send('verified succefully');  // OTP is correct
    }

    return res.send('verified Unsuccefully'); // OTP is incorrect or doesn't exist
});

route.route('/user:username').get((req,res)=>{res.json({msg:'username'})})

route.get('/createResetSession',localVariables,(req,res)=>{

    try {
        if(localSession == true){
            // localSession = false
            return res.json({msg:'access granted'})
        }else{
            return res.json({msg:'access denied'})
        }
        
    } catch (error) {
        console.log('session error ',error)
    }

   
})





// put method
route.put('/updateUser',verifyJWT,(req,res)=>{

    let user = req.user
    console.log(user)

    res.send(user)
})

route.put('/resetPassword', async (req, res) => {
    if(localSession == false) return res.json({msg:'session expired'})
    const { username, password } = req.body;  // Destructure username and password from request body

    try {
        // Find if the user exists by username
        const userExist = await User.findOne({ username });
        
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });  // Return 404 if user doesn't exist
        }

        // Hash the new password (await is important here)
        const hashPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await User.findOneAndUpdate({ username }, { password: hashPassword });
        localSession = false

        // Send a success response after updating the password
        return res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error resetting password:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});


export default route