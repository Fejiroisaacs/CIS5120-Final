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

// POST route to add a new group
app.post('/api/add-group', (req, res) => {
  const newGroup = req.body;

  if (!newGroup.name || !newGroup.members || !newGroup.tags || !newGroup.audioFile) {
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

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
