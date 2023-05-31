// const express = require('express');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare()
//   .then(() => {
//     const server = express();

//     // Enable CORS middleware
//     server.use((req, res, next) => {
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       next();
//     });

//     // Your API route
//     server.get('/', (req, res) => {
//       // Your server-side logic
//       res.send('Response from the server');
//     });

//     // Default Next.js request handling
//     server.all('*', (req, res) => {
//       return handle(req, res);
//     });

//     // Start the server
//     server.listen(3000, (err) => {
//       if (err) throw err;
//       console.log('Server is running on port 3000');
//     });
//   })
//   .catch((ex) => {
//     console.error(ex.stack);
//     process.exit(1);
//   });
