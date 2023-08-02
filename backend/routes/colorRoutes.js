const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("../controller/colorController");
const { jwtTokenvalidityCheck, isAdminCheck } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post("/", jwtTokenvalidityCheck, isAdminCheck, createColor);
router.put("/:id", jwtTokenvalidityCheck, isAdminCheck, updateColor);
router.delete("/:id", jwtTokenvalidityCheck, isAdminCheck, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);

module.exports = router;