import { Router } from "express";
import { User } from "../models/User";
import { authMiddleware, requireRole } from "../middlewares/auth";
const router = Router();

router.get("/", authMiddleware, requireRole("admin"), async (req, res) => {
  const partners = await User.find({ role: "partner" }).select("-password");
  res.json(partners);
});

router.put(
  "/:id/availability",
  authMiddleware,
  requireRole("partner"),
  async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { availability },
      { new: true }
    ).select("-password");
    res.json(user);
  }
);

export default router;
