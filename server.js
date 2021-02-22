const proxy = require('express-http-proxy');
const express = require('express');
const app = express();

let BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9200'
let PUBLISH_PORT = parseInt(process.env.PUBLISH_PORT) || 3000

app.use('/api', proxy(BACKEND_URL));
app.use(express.static('./build'));
app.listen(PUBLISH_PORT, () => console.log('Frontend listening on port: ' + PUBLISH_PORT));