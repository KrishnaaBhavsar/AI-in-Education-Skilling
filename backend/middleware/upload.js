const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/"),
  filename: function (req, file, cb) {
    // Save file as: pdf-timestamp.pdf
    cb(
      null,
      "pdf-" + Date.now() + path.extname(file.originalname),
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    console.log("File upload attempt:", file);
    const filetypes = /pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    console.log("File extname check:", extname, "mimetype check:", mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

module.exports = upload;
