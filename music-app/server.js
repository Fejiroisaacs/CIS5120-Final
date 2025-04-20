const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    // Save the file with the original name or customize it
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Path to the groups JSON file
const groupsFilePath = path.join(__dirname, 'src/data', 'groups.json');
const projectsFilePath = path.join(__dirname, 'src/data', 'myProjects.json');

// POST route to add a new group
app.post('/api/add-group', (req, res) => {
  const newGroup = req.body;

  if (!newGroup.title || !newGroup.members || !newGroup.genres || !newGroup.audioFile) {
    return res.status(400).json({ error: 'Missing required group fields' });
  }

  try {
    const currentData = fs.readFileSync(groupsFilePath, 'utf-8');
    const groups = JSON.parse(currentData);

    groups.push(newGroup);

    fs.writeFileSync(groupsFilePath, JSON.stringify(groups, null, 2));
    res.status(200).json({ message: 'Group added successfully' });
  } catch (err) {
    console.error('Error updating groups file:', err);
    res.status(500).json({ error: 'Failed to update groups file' });
  }
});

app.post('/api/add-project', (req, res) => {
  const newProject = req.body;

  if (!newProject.title || !newProject.members || !newProject.genres || !newProject.audioFile) {
    return res.status(400).json({ error: 'Missing required group fields' });
  }

  try {
    const currentData = fs.readFileSync(projectsFilePath, 'utf-8');
    const groups = JSON.parse(currentData);

    groups.push(newProject);

    fs.writeFileSync(projectsFilePath, JSON.stringify(groups, null, 2));
    res.status(200).json({ message: 'Project added successfully' });
  } catch (err) {
    console.error('Error updating groups file:', err);
    res.status(500).json({ error: 'Failed to update project file' });
  }
});

app.post('/api/upload', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), (req, res) => {
  console.log(req.body);
  const { title, members, audioRuntime, selectedGenres, selectedInstruments } = req.body;
  const audioFile = req.files['audio']?.[0];
  const imageFile = req.files['image']?.[0];

  if (!title || !members || !selectedGenres ||  !selectedInstruments || !audioFile) {
    return res.status(400).json({ error: 'Missing required group fields' });
  }

  const cleanedProject = {
    title,
    members: members.split(',').map(m => m.trim()), // Split into array
    runtime: audioRuntime,
    genres: parseJsonArray(selectedGenres),
    instruments: parseJsonArray(selectedInstruments),
    image: `uploads/${req.files.image[0].filename}`,
    audioFile: `uploads/${req.files.audio[0].filename}`
  };

  try {
    const currentData = fs.readFileSync(projectsFilePath, 'utf-8');
    const groups = JSON.parse(currentData);

    groups.push(cleanedProject);
    fs.writeFileSync(projectsFilePath, JSON.stringify(groups, null, 2));

    res.status(200).json({ message: 'Project added successfully' });
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function parseJsonArray(data) {
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
