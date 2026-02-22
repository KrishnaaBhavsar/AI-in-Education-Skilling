const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const upload = require("../middleware/upload");

// @route   POST /api/subjects
// @desc    Create a new subject
const multerErrorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    return res.status(400).json({ error: error.message });
  } else if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

router.post("/", upload.single('pdf'), multerErrorHandler, async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Subject name is required" });
    }

    const newSubject = new Subject({
      name: name.trim(),
      pdfPath: req.file ? req.file.path : null,
    });
    const savedSubject = await newSubject.save();
    console.log("Subject created:", savedSubject);
    res.status(201).json(savedSubject);
  } catch (err) {
    console.error("Error creating subject:", err);
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

// @route   DELETE /api/subjects/:id
// @desc    Delete a subject
router.delete("/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    // Delete the associated PDF file if it exists
    if (subject.pdfPath) {
      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(__dirname, "..", subject.pdfPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error("Error deleting subject:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
