const proxy = require('express-http-proxy');
const express = require('express');
const app = express();

let BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9200'

app.use('/api', proxy(BACKEND_URL));
app.use(express.static('./build'));
app.listen(3000, () => console.log('Frontend listening on port: 3000'));