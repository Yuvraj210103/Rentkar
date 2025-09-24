import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  address: string;
  lat?: number;
  lng?: number;
  status: "created" | "assigned" | "picked" | "delivered";
  partner?: Types.ObjectId | null;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
    status: {
      type: String,
      enum: ["created", "assigned", "picked", "delivered"],
      default: "created",
    },
    partner: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", OrderSchema);
