const express = require('express');
const app = express();

// Define the users
const users = [
  { id: 1, name: 'Alberto Camarena' },
  { id: 2, name: 'Daniela Lopez' },
  { id: 3, name: 'Luis Sanchez' },
];

// Set a middleware to add headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Handle GET requests for /api/users
app.get('/api/users', (req, res) => {
  res.status(200).send(JSON.stringify(users));
});

// Handle all other routes
app.use((req, res) => {
  res.status(404).send(JSON.stringify({ message: 'Route not found' }));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});