const express = require('express');
const { createBlogCategory,getAllBlogCategories ,updateBlogCategory,getABlogCategory,deleteBlogCategory} = require('../controller/blogCategoryController');
const { isAdminCheck, jwtTokenvalidityCheck } = require('../middleware/authMiddleWare');


const router = express.Router();
router.route("/").post( jwtTokenvalidityCheck,isAdminCheck,createBlogCategory)
router.route("/all").get(jwtTokenvalidityCheck,getAllBlogCategories)
router.route("/:id").get(jwtTokenvalidityCheck,getABlogCategory)
router.route("/update/:id").put(jwtTokenvalidityCheck,isAdminCheck,updateBlogCategory)
router.route("/delete/:id").delete(jwtTokenvalidityCheck,isAdminCheck,deleteBlogCategory)


module.exports = router; 