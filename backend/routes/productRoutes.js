const express = require('express');
const { createProduct, getAllProduct, updateProduct, deleteProduct, getaProduct, addToWishlist, rating } = require('../controller/productControler');
const { isAdminCheck, jwtTokenvalidityCheck } = require('../middleware/authMiddleWare');

const router = express.Router();

router.route("/").post(jwtTokenvalidityCheck,isAdminCheck,createProduct)

router.route("/allproduct").get(getAllProduct)

router.route("/wishlist").put(jwtTokenvalidityCheck,addToWishlist)
router.route("/rating").put(jwtTokenvalidityCheck,rating)
router.route("/:id").get(jwtTokenvalidityCheck,getaProduct)
router.route("/update/:id").put(jwtTokenvalidityCheck,isAdminCheck,updateProduct)
router.route("/delete/:id").delete(jwtTokenvalidityCheck,isAdminCheck,deleteProduct)


module.exports = router;