const JWT = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require("./generateJWTToken")





const generateRefToken = (id=>{
    console.log(id)
    const refToken = JWT.sign({id},process.env.JWT_SECRET,{
        expiresIn:"3d",
    })  
    console.log(refToken)
    
    return refToken;
})
module.exports = generateRefToken;


