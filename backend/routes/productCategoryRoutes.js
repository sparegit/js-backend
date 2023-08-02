const express = require('express');
const { createProductCategory, updateProdCategory, getAllCategories, getCategory, deleteCategory } = require('../controller/productCategoryController');
const { isAdminCheck, jwtTokenvalidityCheck } = require('../middleware/authMiddleWare');
const { addToWishList } = require('../controller/userController');
const Router = express.Router();

Router.route("/").post(jwtTokenvalidityCheck,isAdminCheck,createProductCategory)
Router.route("/all").get(jwtTokenvalidityCheck,getAllCategories)
Router.route("/:id").get(jwtTokenvalidityCheck,getCategory)

Router.route("/update/:id").put(jwtTokenvalidityCheck,isAdminCheck,updateProdCategory)
Router.route("/delete/:id").delete(jwtTokenvalidityCheck,isAdminCheck,deleteCategory)

module.exports = Router;