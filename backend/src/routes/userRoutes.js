const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteProfile,
  createUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.post("/", createUser);
router.get("/perfil", verifyToken, getProfile);
router.put("/perfil", verifyToken, updateProfile);
router.delete("/perfil", verifyToken, deleteProfile);

module.exports = router;
