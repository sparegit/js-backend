const User = require("../models/userModel")
const Product = require("../models/productModel")
const Cart = require("../models/cartModel")
const Order = require("../models/orderModel")
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateJWTToken");
const validateMongoDBID = require("../utils/validMongoDbId")
const generateRefToken = require("../utils/generateRefreshToken")
const JWT = require('jsonwebtoken');
const sendEmail = require("./emailcontroller");

//create a user
const creatUser = asyncHandler (async(req,res) =>{
    const email = req.body.email;
    console.log(email);
    const findUser = await User.findOne({email});
  if(findUser){
    res.status(400);
    throw new Error("user already Exist");
  }
  // if user is not already in Database, then create a new user with user inputs from req.body and save.
  const newUser = await User.create(req.body)
  if(newUser){
    res.status(201).json({
        _id:newUser._id,
        firstname:newUser.firstname,
        lastname:newUser.lastname,
        email:newUser.email,
        mobile:newUser.mobile,
        isAdmin:newUser.isAdmin,
        isBlocked:newUser.isBlocked,
        token:generateToken(newUser),

    });
  }else{
    res.status(400)
    throw new Error("error occoured")
  }
})

// login user
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email});

    //check if user is already registered and also if password entered is matched with password stored in DB.
    
    if(user && await user.matchPassword(password)){
      console.log(user._id);
      //update refreshToken field in user model for the respective user by generating refresh token with generateRefToken function.
      const updateUser = await User.findByIdAndUpdate(user?._id,{
        refreshToken: generateRefToken(user._id)
      },
      {new: true})
      //store the refreshToken in cookies
      res.cookie("refreshToken", updateUser.refreshToken,{
        httpOnly: true,
        maxAge:72*60*60*1000,
      })
       
            res.json({
                _id:user._id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                mobile:user.mobile,
                isAdmin:user.isAdmin,
                isBlocked:user.isBlocked,
                pic:user.pic,
                token:generateToken(user),
                
        
            });
        
    }else{
        res.status(400);
        throw new Error("invalid Email or pass")
    }
})


const adminLogin = asyncHandler(async(req,res)=>{
  const {email, password} = req.body
    const findAdminUser = await User.findOne({email});
  const passwordMatched =await findAdminUser.matchPassword(password)
 
    //check if user is already registered and also if password entered is matched with password stored in DB.
    if(findAdminUser && passwordMatched ){
       if(!findAdminUser.isAdmin){
         throw new Error ("not authorized")
      }
      //update refreshToken field in user model for the respective user by generating refresh token with generateRefToken function.
      const updateUser = await User.findByIdAndUpdate(findAdminUser?._id,{
        refreshToken: generateRefToken(findAdminUser._id)
      },
      {new: true})
      //store the refreshToken in cookies
      res.cookie("refreshToken", updateUser.refreshToken,{
        httpOnly: true,
        maxAge:72*60*60*1000,
      })
       
            res.json({
                _id:findAdminUser._id,
                firstname:findAdminUser.firstname,
                lastname:findAdminUser.lastname,
                email:findAdminUser.email,
                mobile:findAdminUser.mobile,
                isAdmin:findAdminUser.isAdmin,
                isBlocked:findAdminUser.isBlocked,
                pic:findAdminUser.pic,
                token:generateToken(findAdminUser),
                
        
            });
        
    }else{
        res.status(400);
        throw new Error("invalid Email or pass")
    }
})

//get all the users (admin funtionality)
const getAllUser = asyncHandler(async(req,res)=>{
  try{
    const allUsers = await User.find();
    res.json(allUsers);
  }catch(error){
    throw new Error("no users found")
  }
  
})

// get a user by using id 
const getaUserByID = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  validateMongoDBID(_id)
 

  try{
    const user = await User.findById(_id)
    res.json({
      user
    })
    
  }catch(error){
    throw new Error("user not found")
  }
 
})


//delete a user by id (admin funtionality)
const deleteAUserByID = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  validateMongoDBID(_id)
  try{
   const user= await  User.findByIdAndDelete(_id);
  res.json({
    user
  })

      
  }catch(error){
    throw new Error(error)
  }
})

//update a user
const updateAUser = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  validateMongoDBID(_id)
  try{
      const updatedUser = await User.findByIdAndUpdate(_id,{
        firstname:req?.body?.firstname,
        lastname:req?.body?.lastname,
        email:req?.body?.email,
        isAdmin:req?.body?.isAdmin,
        isBlocked:req?.body?.isBlocked,
        pic:req?.body?.pic,
        mobile:req?.body?.mobile,
      },{new :true,})
      res.json({updatedUser})
  }catch(err){
    throw new Error(err);
  }
})

//block a user
const blockUser = asyncHandler(async(req,res)=>{
  const {id} = req.params
  validateMongoDBID(id)
  console.log(id);
  try{
      const block =await  User.findByIdAndUpdate(id,{
        
        isBlocked:true,
        
      },{new :true,})
      res.json(block)
  }catch(err){
    throw new Error(err);
  }
})
//unblock a user
const unBlockUser = asyncHandler(async(req,res)=>{
  const {id} = req.params
  validateMongoDBID(id)
  try{
      const unblock = await User.findByIdAndUpdate(id,{
        
        isBlocked:false,
        
      },{new :true,})
      res.json(unblock)
  }catch(err){
    throw new Error(err);
  }
})


//handleing refresh token
const handleRefreshToken = asyncHandler(async(req,res)=>{
  const cookie = req.cookies
  console.log({cookie});

  if(!cookie?.refreshToken) throw new Error('no refresh token found');
  const refreshToken = cookie.refreshToken
  const user = await User.findOne({refreshToken});
  // res.clearCookie('refreshToken')
  if(!user)throw new Error ('no user found')
  JWT.verify(refreshToken,process.env.JWT_SECRET,(error,decoded)=>{
     if(error||user._id!=decoded.id){
      throw new Error('corrupted refreshtoken')
     }else{
      const accesToken = generateToken(user?._id)
      res.json({accesToken});
     }
  })
})

//logout a user
const logOut = asyncHandler(async(req, res)=>{
  const cookie = req.cookies
  console.log(cookie);
  if(!cookie)throw new Error('no cookie found')
  const refreshToken = cookie.refreshToken
  //find the user with the healp of refreshToken stored in cookie and update the field refreshToken of the user back to null as user is about to logout.
  const user = await User.findOne({refreshToken}) 
  if(!user){
    //clear the refreshToken stored in cookie.
    res.clearCookie(refreshToken,{
      httpOnly:true,
      secure:true,
    })
    res.sendStatus(204); //forbidden
  }else{
    //update the field refreshToken of the user back to null as user is about to logout.
    await User.findOneAndUpdate(refreshToken,{
      refreshToken:"",
    });
    //clear the refreshToken stored in cookie.
    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure: true,
    });
  res.sendStatus(204)
  }
})


const updatePassword = asyncHandler (async (req,res)=>{
  const {_id}= req.user
  const {password} = req.body
  validateMongoDBID(_id);
  const user = await User.findById(_id)
  if(password){
    user.password = password
    const updatedUserPassword = await user.save();
    res.json(updatedUserPassword);
  }else{
    res.json(user);
  }
})

const forgotPasswordToken = asyncHandler(async (req,res)=>{
  const {email} = req.body
  console.log(email);
  const user = await User.findOne({email});
  if(!user){
    throw new Error("user doesnot exist");
  }
  try{
    const token = await user.createPasswordResteToken()
    await user.save()
     const resetURL =`10 min <a href=http://localhost:5000/api/users/reset-password/${token}>`
    const data ={
      to:email,
      Text: "hey there",
      subject:" forgot pass link",
      htm: resetURL
    }
    sendEmail(data)
    res.json(token)
  }catch(err){
    throw new Error(err);
  }
})


const getUserWishList = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  console.log(req.user);
  try {
    const userWishList = await User.findById(_id).populate('wishlist') 
    res.json(userWishList)
  } catch (error) {
    throw new Error(error)
  }
})

const userCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  const {cart} = req.body

try {
  const user = await User.findById(_id)
  const alreadyExistCart = await Cart.findOne({orderby:user._id})
  if(alreadyExistCart){
    alreadyExistCart.deleteOne()
  }
  let products =[];
  for(let i=0;i<cart.length;i++){
    let object ={}
    object.product = cart[i]._id
    object.count = cart[i].count
    object.color = cart[i].color

    let getPrice = await Product.findById(cart[i]._id).select('price').exec();
    object.price = getPrice.price
    products.push(object);
  }
  let cartTotal = 0;
  for(let i =0;i<products.length;i++){
    cartTotal = cartTotal+products[i].price*products[i].count;
  }
  console.log(products,cartTotal);
  let newCart = await new Cart({
    products,cartTotal,
    orderby: user._id,
  }).save();
  res.json(newCart)
} catch (error) {
  throw new Error(error);
}
})

const getUserCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  try {
    const user = await User.findById(_id)
    const cart = await Cart.findOne({orderby:user?._id}).populate("products.product")
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
})
const emptyCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  try {
    const user = await User.findById(_id)
    const cart = await Cart.findOneAndRemove({orderby:user?._id})
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
})







module.exports = {creatUser,userCart,emptyCart,getUserCart,loginUser,logOut,getAllUser,getaUserByID, deleteAUserByID,updateAUser,blockUser,unBlockUser,handleRefreshToken,updatePassword,forgotPasswordToken,getUserWishList,adminLogin}