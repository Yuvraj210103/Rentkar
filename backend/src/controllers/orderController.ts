import { Request, Response } from "express";
import { Order } from "../models/Order";
import { User } from "../models/User";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, address, lat, lng } = req.body;
    const order = new Order({ customerName, address, lat, lng });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const listOrders = async (req: Request, res: Response) => {
  const orders = await Order.find().populate("partner", "name email");
  res.json(orders);
};

export const assignOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { partnerId } = req.body;
    const partner = await User.findById(partnerId);
    if (!partner || partner.role !== "partner")
      return res.status(400).json({ message: "Invalid partner" });
    const order = await Order.findByIdAndUpdate(
      id,
      { partner: partner._id, status: "assigned" },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "picked" or "delivered"
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
