const express = require('./config/express');

const port = 5000;
express().listen(port, console.log(`The application is listening on ${port}`));
