const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:categoryId", getProductsByCategory);

router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
