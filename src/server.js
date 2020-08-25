const http = require('http');
const { log } = require('console');

const express = require('./configuration/express');

const app = express();
const port = app.get('port');

http.createServer(app).listen(port, () => {
  log(`Server is running at ${port}`);
});
