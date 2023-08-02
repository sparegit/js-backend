const express = require('express')
const asyncHandler = require('express-async-handler')
const Bcategory = require('../models/blogCategoryModel')




const createBlogCategory = asyncHandler(async(req,res)=>{
    try {
        const newBlogCategory= await Bcategory.create(req.body)
        res.json(newBlogCategory)
    } catch (error) {
        throw new Error (error)
    }
})

const getAllBlogCategories = asyncHandler(async(req,res)=>{
    try {
        const blogs= await Bcategory.find();
        res.json(blogs)
    } catch (error) {
        throw new Error (error)
    }
})

const updateBlogCategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
        const blog= await Bcategory.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.json(blog)
    } catch (error) {
        throw new Error (error)
    }
})
const getABlogCategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
        const blog = await Bcategory.findById(id)
        res.json(blog)
    } catch (error) {
        throw new Error (error)
    }
})
const deleteBlogCategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
        const deletedblogcategory = await Bcategory.findByIdAndDelete(id)
        res.json(deletedblogcategory)
    } catch (error) {
        throw new Error (error)
    }
})

module.exports ={createBlogCategory,getAllBlogCategories,updateBlogCategory,getABlogCategory,deleteBlogCategory}