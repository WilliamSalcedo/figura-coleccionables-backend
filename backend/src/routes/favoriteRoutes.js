const express = require("express");
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} = require("../controllers/favoriteController");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, getFavorites);
router.post("/", verifyToken, addFavorite);
router.get("/check/:productoId", verifyToken, checkFavorite);
router.delete("/:id", verifyToken, removeFavorite);

module.exports = router;
