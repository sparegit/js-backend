const User = require("../models/userModel")
//const expressAsyncHandler = require("express-async-handler")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// check if the token recieved is a valid one.
const jwtTokenvalidityCheck  = asyncHandler(async(req,res,next)=>{
    let token;
    //getting only the token as the token starts with word (Bearer "token") 
    if(req?.headers?.authorization?.startsWith('Bearer')){
        //spliting the token from its header Bearer which is in [0] index . as only token which is in [1] index is only needed.
        token = req.headers.authorization.split(' ')[1];
        try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET) //verify if the token is valid by usinng verify function in jsonwebtoken with the secret key present in environment config file.
         const {id}= decoded
         const user= await User.findById(id)
         req.user = user;
         next();
        }catch(err){    
            throw new Error("login again")
        }
    }else{
        throw new Error("no token attached")
    }
})

//check wheather the user is admin or not for accessing afmin routes and functionalities related to admin.
 const isAdminCheck = asyncHandler(async(req,res,next)=>{ 
    const {email} = req.user
         const adminUser =await User.findOne({email})
         if(adminUser.isAdmin!==true){
             throw new Error(" not an admin")
       }else{
        //    res.json({
        //         adminUser
        //      })
             next();
         }
    
 })
module.exports ={ jwtTokenvalidityCheck ,isAdminCheck}