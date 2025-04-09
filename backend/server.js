const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

const projectsDir = path.join(__dirname, "projects");
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const projectPath = path.join(projectsDir, req.body.title);
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath); 
    }
    cb(null, projectPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.fields([{ name: "image" }, { name: "audio" }]), (req, res) => {
    try {
      res.status(200).json({ message: "Project files saved successfully", files: req.files });
    } catch (error) {
      res.status(500).json({ message: "Server error while saving files", error: error.message });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});