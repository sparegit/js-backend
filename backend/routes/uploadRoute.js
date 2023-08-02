const express = require('express');
const {uploadImages, deleteImages } = require('../controller/uploadController');
const { isAdminCheck, jwtTokenvalidityCheck } = require('../middleware/authMiddleWare');
const { uploadPhoto, productImgResize } = require('../middleware/uploadImages');

const router = express.Router();

router.route("/").post(uploadPhoto.array('images',10),productImgResize,uploadImages)
router.route("/delete-img/:id").delete(deleteImages)

module.exports = router;