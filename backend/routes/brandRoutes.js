const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("../controller/brandController");
const { jwtTokenvalidityCheck, isAdminCheck } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post("/", jwtTokenvalidityCheck, isAdminCheck, createBrand);
router.put("/:id", jwtTokenvalidityCheck, isAdminCheck, updateBrand);
router.delete("/:id", jwtTokenvalidityCheck, isAdminCheck, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;