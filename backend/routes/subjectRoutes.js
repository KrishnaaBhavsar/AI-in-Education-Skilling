const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const upload = require("../middleware/upload");

// @route   POST /api/subjects
// @desc    Create a new subject
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newSubject = new Subject({
      name,
      pdfPath: req.file ? req.file.path : null,
    });
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/subjects
// @desc    Get all subjects for the dashboard
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
