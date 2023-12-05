const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5004;

app.use(bodyParser.json());

// Sample data
let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// API endpoints
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.json(newItem);
});

app.put('/api/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  data = data.map(item => (item.id === itemId ? { ...item, ...updatedItem } : item));

  res.json({ message: 'Data updated successfully' });
});

app.delete('/api/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  data = data.filter(item => item.id !== itemId);

  res.json({ message: 'Data deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
