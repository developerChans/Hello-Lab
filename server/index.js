const express = require("./config/express");

express().listen(
  process.env.SERVER_PORT,
  console.log(
    `The application is listening on ${process.env.SERVER_PORT}\napplication environment: ${process.env.NODE_ENV}`
  )
);
