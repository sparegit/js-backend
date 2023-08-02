const express = require('express')
const asyncHandler = require('express-async-handler')
const ProdCategory = require('../models/productCategoryModel')


const createProductCategory = asyncHandler(async(req,res)=>{
  try {
    const newCategory = await ProdCategory.create(req.body)
    res.json(newCategory);
  } catch (error) {
    throw new Error(error)
  }
})

const updateProdCategory = asyncHandler(async(req,res)=>{
    try {
        const {id }= req.params
      const updatedCategory = await ProdCategory.findByIdAndUpdate(id,req.body,{
        new:true,
      })
      res.json(updatedCategory)
    } catch (error) {
      throw new Error(error)
    }
  })
  const getAllCategories = asyncHandler(async(req,res)=>{
    try {
        const categories = await ProdCategory.find()
        res.json(categories)
    } catch (error) {
        throw new Error(error)
    }
  })

  const getCategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
        const category = await ProdCategory.findById(id)
        res.json(category)
    } catch (error) {
        throw new Error(error)
    }
  })
  const deleteCategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
        const deletedCategory = await ProdCategory.findByIdAndDelete(id)
        res.json(deletedCategory)
    } catch (error) {
        throw new Error(error)
    }
  })
module.exports = {createProductCategory,updateProdCategory,getAllCategories,getCategory,deleteCategory}