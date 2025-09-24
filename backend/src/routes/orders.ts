import { Router } from "express";
import {
  createOrder,
  listOrders,
  assignOrder,
  updateStatus,
} from "../controllers/orderController";
import { authMiddleware, requireRole } from "../middlewares/auth";
const router = Router();

router.post("/", authMiddleware, requireRole("admin"), createOrder);
router.get("/", authMiddleware, listOrders);
router.put("/:id/assign", authMiddleware, requireRole("admin"), assignOrder);
router.put("/:id/status", authMiddleware, requireRole("partner"), updateStatus);

export default router;
