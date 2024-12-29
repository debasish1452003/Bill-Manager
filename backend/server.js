import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/billManager";

// mongoose.set("strictQuery", true);

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Bill Schema and Model
const billSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
});

const Bill = mongoose.model("Bill", billSchema);

// Routes

app.get("/api/bills/:id", async (req, res) => {
  try {
    const billId = req.params.id.trim();
    console.log("Received ID:", billId);
    console.log("ID Type:", typeof billId);

    if (!mongoose.Types.ObjectId.isValid(billId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const bill = await Bill.findById(billId);

    if (bill) {
      res.json(bill);
    } else {
      res.status(404).json({ error: "Bill not found" });
    }
  } catch (err) {
    console.error("Error fetching bill:", err);
    res.status(500).json({ error: "Failed to fetch bill" });
  }
});

app.post("/api/bills", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(500).json({ error: "Failed to create bill" });
  }
});

app.put("/api/bills/:id", async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBill);
  } catch (err) {
    res.status(500).json({ error: "Failed to update bill" });
  }
});

app.delete("/api/bills/:id", async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete bill" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
