const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.get("/perfil", verifyToken, getProfile);
router.put("/perfil", verifyToken, updateProfile);
router.delete("/perfil", verifyToken, deleteProfile);

module.exports = router;
