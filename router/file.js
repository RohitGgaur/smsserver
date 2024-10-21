const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename (timestamp + extension)
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional file size limit (5MB in this case)
});

// Define the file upload route
router.post("/", (req, res) => {
  upload.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A multer-specific error occurred (like file size limit exceeded)
      return res.status(400).send({ message: err.message });
    } else if (err) {
      // Another unknown error occurred when uploading
      return res.status(500).send({ message: "Internal Server Error" });
    }

    // Everything went fine, handle success
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    res.send({
      message: "File uploaded successfully",
      file: req.file,
    });
  });
});

module.exports = router;
