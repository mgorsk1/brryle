const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = parseInt(process.env.PUBLISH_PORT) || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9200'

// Proxy /api to Elasticsearch
app.use('/api', proxy(BACKEND_URL, {
  proxyReqPathResolver: req => req.originalUrl.replace(/^\/api/, ''),
}));

// Serve static assets (e.g., JS, CSS, etc.)
app.use(express.static(path.join(__dirname, 'build')));

// Fallback: serve index.html
app.get('*', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>React App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/js/index.js"></script>
      </body>
    </html>
  `;
  res.type('html').send(html);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});