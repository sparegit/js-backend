const express = require('express');
const { createProduct, getAllProducts, getAProductByID, updateAProductByID, deleteAProductByID } = require('../controller/productControler');
const {creatUser,loginUser, getAllUser, getaUserByID, deleteAUserByID, updateAUser, blockUser, unBlockUser, logOut, handleRefreshToken, updatePassword, forgotPasswordToken, adminLogin, getUserWishList, userCart, getUserCart, emptyCart}= require('../controller/userController');
const {jwtTokenvalidityCheck,isAdminCheck} = require('../middleware/authMiddleWare');
const { createOrder, getAllOrder, getOrders, updateOrderStatus } = require('../controller/OrderController');

const router = express.Router();

router.route("/register").post(creatUser)
router.route("/admin/login").post(adminLogin)
router.route("/login").post(loginUser)
router.route("/cart").post(jwtTokenvalidityCheck,userCart)
router.route("/getcart").get(jwtTokenvalidityCheck,getUserCart)
router.route("/createorder").post(jwtTokenvalidityCheck,createOrder)
router.route("/get-orders").get(jwtTokenvalidityCheck,getOrders)
router.route("/get-all-orders").get(getAllOrder)
router.route("/update-order/:id").put(jwtTokenvalidityCheck,isAdminCheck,updateOrderStatus)
router.route("/emptycart").delete(jwtTokenvalidityCheck,emptyCart)
router.route("/wishlist").get(jwtTokenvalidityCheck,getUserWishList)
router.route("/logout").post(logOut)
router.route("/forgot-password-token").post(forgotPasswordToken)
router.route("/password").put(jwtTokenvalidityCheck,updatePassword)
router.route("/refresh").get(handleRefreshToken)
router.route("/allUsers").get(getAllUser)
router.route("/:id").get(jwtTokenvalidityCheck,isAdminCheck ,getaUserByID)

router.route("/delete/:id").post(deleteAUserByID)
router.route("/update/:id").put(jwtTokenvalidityCheck,updateAUser)
router.route("/block/user/:id").put(jwtTokenvalidityCheck,isAdminCheck,blockUser)
router.route("/unblock/user/:id").put(jwtTokenvalidityCheck,isAdminCheck,unBlockUser)





module.exports = router;
//64109c654873c02507f4cdf 