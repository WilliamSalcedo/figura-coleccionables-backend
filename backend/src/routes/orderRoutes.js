const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrderById);
router.post("/", verifyToken, createOrder);

router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

module.exports = router;
