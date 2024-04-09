# Built an API with Node

## Part 1: Just node

### Install Node

You can find install instructions [here](https://nodejs.org/en)

### Check instalation

Run ``` node -v ``` in your terminal to check if node is installed

### Create a new project

Run ``` npm init -y ``` to create a new project

### Check your project

Look for the package.json file in your project folder

### Create a new server file

Create a new file called server.js
Run ``` touch server.js ``` in your terminal

### Import http module

Write the following code in your server.js file

```javascript
// We're going to make use of the http module to create a simple server
//   that listens on port 3000 and returns a list of users when a GET 
//   request is made to /api/users.
const http = require('http');

const server = http.createServer((req, res) => {
  // Set the response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Handle different routes
  if (req.url === '/api/users') {
    // Handle GET request for /api/users
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } else {
    // Handle other routes
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Run your server

Run ``` node server.js ``` in your terminal

### Test your server

Make a GET request to <http://localhost:3000/api/users>
An option is to use Postman, or any other API testing tool
In JS you can use the fetch API, in a test.js file

```javascript
fetch('http://localhost:3000/api/users')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## Part 2: Express

### Install Express

Run ``` npm install express ``` in your terminal

### Modify the server file

Replace the http module with express

```javascript
const express = require('express');
const app = express();

// Define the users
const users = [
  { id: 1, name: 'Alberto Camarena' },
  { id: 2, name: 'Daniela Lopez' },
];

// Set a middleware to add headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Handle GET requests for /api/users
app.get('/api2/users', (req, res) => {
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
```

### Run your server with express

Run ``` node server.js ``` in your terminal

## Part 3: Add a database

### Create a firebase project

Go to [Firebase](https://firebase.google.com) and create a new project
Then go to the database section and create a new Firestore database

### Install Firebase

Run ``` npm install firebase-admin --save ``` in your terminal

### Add a new firebase file

Create a new file called firebase.js containing the following code

```javascript
const admin = require('firebase-admin');
const express = require('express');
const app = express();

// Initialize Firebase Admin
var serviceAccount = require("path/to/your/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// Handle GET requests for /api/songs
app.get('/api/songs', async (req, res) => {
  const songsSnapshot = await db.collection('songs').get();
  const songs = [];
  songsSnapshot.forEach(doc => {
    songs.push(doc.data());
  });
  res.status(200).send(JSON.stringify(songs));
});

// Handle all other routes
app.use((req, res) => {
  res.status(404).send(JSON.stringify({ message: 'Route not found' }));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
