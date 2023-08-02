const express = require('express')
const { isAdminCheck, jwtTokenvalidityCheck } = require('../middleware/authMiddleWare');
const { createBlog, updateBlog, getABlog, getAllBlog, deleteBlog, likeBlog, dislikeBlog, uploadBlogImages } = require('../controller/blogController');
const { blogImgResize, uploadPhoto } = require('../middleware/uploadImages');

const router = express.Router();

router.route("/").post(jwtTokenvalidityCheck,isAdminCheck,createBlog)

router.route("/all").get(getAllBlog)
router.route("/like").put(jwtTokenvalidityCheck,likeBlog)
router.route("/dislike").put(jwtTokenvalidityCheck,dislikeBlog)
router.route("/upload/:id").put(uploadPhoto.array('images',2),blogImgResize,uploadBlogImages)
router.route("/:id").get(jwtTokenvalidityCheck,isAdminCheck,getABlog)

router.route("/update/:id").put(jwtTokenvalidityCheck,isAdminCheck,updateBlog)
router.route("/delete/:id").delete(jwtTokenvalidityCheck,isAdminCheck,deleteBlog)


module.exports = router