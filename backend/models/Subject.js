const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progress: { type: Number, default: 0 },
  color: { type: String, default: "bg-blue-500" }, // For the frontend UI
  pdfPath: { type: String }, // Path to the uploaded file
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subject", SubjectSchema);
