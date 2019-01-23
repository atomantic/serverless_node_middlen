const express = require('express')
const app = express()
const PORT = process.env.PORT||3000;
const HOST = '0.0.0.0';

// we will forward our request for http://oursite.com/john/foo to http://localhost:PORT/
app.all('/', require('./route'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)