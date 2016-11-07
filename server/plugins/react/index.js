'use strict';

const hapiReactViews = require('hapi-react-views');

function register (server, options, next) {
  server.views({
    engines: {
      jsx: hapiReactViews
    },
    relativeTo: 'client',
    path: 'views'
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'client',
        index: ['index.html']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return reply.view('Default');
    }
  });

  next();
}

register.attributes = {
  name: 'react'
};

module.exports = {
  register
};
