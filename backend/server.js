const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Load JSON data
const data = JSON.parse(fs.readFileSync('query_Response.json', 'utf-8'));

// Endpoint to query by keyword
app.get('/query', (req, res) => {
  const userQuery = req.query.q;

  if (!userQuery) {
    return res.status(400).json({ error: 'Please provide a query using ?q=your-query' });
  }

  const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/add', (req, res) => {
  const { query, response } = req.body;

  if (!query || !response) {
    return res.status(400).json({ success: false, message: 'Query and response are required.' });
  }

  // Here you can push to your MongoDB
  // For example: db.collection.insertOne({ query, response })

  console.log('New response added:', { query, response });
  res.json({ success: true });
});


  // Case-insensitive search for query match
  const result = data.find(item => item.query.toLowerCase() === userQuery.toLowerCase());

  if (result) {
    res.json({ response: result.response });
  } else {
    res.status(404).json({ error: 'No matching query found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
