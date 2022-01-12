// implement your server here
const express = require('express');
const server = express();

const postsRouter = require('./posts/posts-router');

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
	res.send(`
      <h2>Post API</h>
      <p>Welcome to the Post API</p>
    `);
});

// require your posts router and connect it here

module.exports = server;
