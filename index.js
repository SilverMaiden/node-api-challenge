const express = require('express');

const apiRoutes = require('./api/apiRoutes');

const server = express();

const port = 5000;


const logger = (req, res, next) => {
    console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} `
  );

  next();

}

server.use(logger);

server.use('/api', apiRoutes);




server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})

