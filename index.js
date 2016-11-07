'use strict';

require('babel-register')({
  presets: ['es2015', 'react']
});

const Hapi = require('hapi');

const plugins = require('server/plugins');

const server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000
});

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});

module.exports = server;
