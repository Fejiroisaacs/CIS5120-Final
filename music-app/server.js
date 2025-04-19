const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

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

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
