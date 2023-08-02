const User = require("../models/userModel")
const Product = require("../models/productModel")
const Cart = require("../models/cartModel")
const Order = require("../models/orderModel")
const expressAsyncHandler = require("express-async-handler")
const uniqueId = require("uniqueid")
const validateMongoDBID = require("../utils/validMongoDbId")

const createOrder = expressAsyncHandler(async (req,res)=>{
const {_id} = req.user
try {
    const cart =await Cart.findOne({orderby:_id})
    let finalAmount = 0;
  

    finalAmount = cart?.cartTotal;
    
    let newOrder = await  Order.create({
        products: cart.products,
        paymentIntent:{
            id: uniqueId(),
            method:"COD",
            amount: finalAmount,
            status: "Cash on Delivery",
            created: Date.now(),
            currency:"INR",
        },
        orderby:_id,
        orderStatus:"Cash on Delivery"
    })

    let update = cart.products.map((item)=>{
        return{
            updateOne:{
                filter:{_id:item.product._id},
                update:{$inc:{quantity: -item.count, sold:+item.count}},
            },
        }
    })
    let updatedCountsAfterOrder = await Product.bulkWrite(update,{});
    res.json(newOrder)
} catch (error) {
    throw new Error(error)
}
})

const getAllOrder = expressAsyncHandler(async (req,res)=>{
  
    try {
        const orders = await Order.find().populate("products.product").populate('orderby').exec();
        res.json(orders)
    } catch (error) {
        throw new Error(error)
    }
})


const getOrders = expressAsyncHandler(async (req,res)=>{
    const {_id} = req?.user
    validateMongoDBID(_id)
    console.log(_id);
  
    try {
      const user = await User.findById(_id)
        const userOrders =await Order.findOne({orderby:user?._id}).populate("orderby").exec();
        res.send(userOrders)
    } catch (error) {
        throw new Error(error)
    }
  })

  const updateOrderStatus = expressAsyncHandler(async(req,res)=>{
    const {_id}= req.user
    const { id }= req.params
    const {status}= req.body
    try {
        const updatedorder = await Order.findByIdAndUpdate(id,{
            orderStatus:status,
            paymentIntent:{
                status:status
            }
        },{new:true})
        res.json(updatedorder)
    } catch (error) {
        throw new Error(error)
    }
  })

module.exports ={createOrder,getAllOrder,getOrders,updateOrderStatus}