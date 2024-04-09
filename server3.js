const admin = require('firebase-admin');
const express = require('express');
const app = express();

// Initialize Firebase Admin
var serviceAccount = require("./ghw-api-week.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// Middleware to parse request bodies as JSON
app.use(express.json());

// Handle GET requests for /api/users
app.get('/api3/users', async (req, res) => {
  const usersSnapshot = await db.collection('users').get();
  const users = [];
  const names = [];
  const ages = [];
  usersSnapshot.forEach(doc => {
    names.push(doc.data().name);
    ages.push(doc.data().age);
    users.push(doc.data());
  });
  res.status(200).send(JSON.stringify({users, names, ages}));
});

// Handle POST requests for /api/users
app.post('/api3/users', async (req, res) => {
  const user = req.body;
  await db.collection('users').add(user);
  res.status(201).send(JSON.stringify({ message: 'User created' }));
});

// Handle PUT requests for /api/users/:id
app.put('/api3/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  await db.collection('users').doc(id).set(user);
  res.status(200).send(JSON.stringify({ message: 'User updated' }));
});

// Handle DELETE requests for /api/users/:id
app.delete('/api3/users/:id', async (req, res) => {
  const id = req.params.id;
  await db.collection('users').doc(id).delete();
  res.status(200).send(JSON.stringify({ message: 'User deleted' }));
});

// Handle all other routes
app.use((req, res) => {
  res.status(404).send(JSON.stringify({ message: 'Route not found' }));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});