const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const subjectRoutes = require("./routes/subjectRoutes");
const chatRoutes = require('./routes/chatRoutes');

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/subjects", subjectRoutes);
app.use('/api/chat', chatRoutes);

console.log("DEBUG: Connection String is ->", process.env.MONGO_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Basic Route for testing
app.get("/", (req, res) => {
  res.send("MasteryPath API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
