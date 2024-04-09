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
      { id: 1, name: 'Alberto Camarena' },
      { id: 2, name: 'Daniela Lopez' },
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