import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./utils/db";
import authRoutes from "./routes/auth";
import orderRoutes from "./routes/orders";
import partnerRoutes from "./routes/partners";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/partners", partnerRoutes);

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});

app.get("/", (req, res) => res.send("Hello guys"));
