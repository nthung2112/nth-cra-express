const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');

// need to add in case of self-signed certificate connection
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Import config file
require('dotenv');

const app = express();
const port = process.env.PORT || 5000;

process.on('unhandledRejection', (reason, p) => {
  console.error(`Unhandled Rejection at: ${p} 'reason: ${reason}`);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

// Remove X-Powered-By in header
app.disable('x-powered-by');

// Disable etag
app.disable('etag');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // Add compression
  app.use(compression());
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build'), {
    maxAge: '1y', // One week
  }));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
