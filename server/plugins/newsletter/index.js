'use strict';

const fs = require('fs');
const path = require('path');
const Boom = require('boom');
const Async = require('async');
const Zip = require('node-zip');
const uuid = require('node-uuid');
const Handlebars = require('handlebars');

function register (server, options, next) {
  Handlebars.registerPartial('fromLX', fs.readFileSync('server/assets/views/partials/fromLX.html').toString());
  Handlebars.registerPartial('fromPT', fs.readFileSync('server/assets/views/partials/fromPT.html').toString());
  Handlebars.registerPartial('fromFriend', fs.readFileSync('server/assets/views/partials/fromFriend.html').toString());

  server.route({
    method: 'POST',
    path: '/newsletter',
    handler: (request, reply) => {
      const menu = JSON.parse(request.payload.menu);
      const filters = request.payload.options;

      const template = Handlebars.compile(fs.readFileSync('server/assets/views/index.html').toString());

      Async.map(filters, (filter, callback) => {
        const context = Object.assign({}, filter, menu);
        return callback(null, {name: filter.name, template: template(context)});
      }, (err, templates) => {
        if (err) {
          return reply(Boom.internal(err.message));
        }
        if (!templates.length) {
          templates = [{
            name: 'default', template: template(menu)
          }];
        }
        const zip = new Zip();
        templates.forEach((template) => {
          zip.file(template.name + '.html', template.template);
        });
        const data = zip.generate({base64: false, compression: 'DEFLATE'});

        const fileName = uuid.v1() + '.zip';
        fs.writeFileSync(path.join('client', 'assets', fileName), data, 'binary');

        return reply({filePath: path.join('assets', fileName)});
      });
    }
  });

  return next();
}

register.attributes = {
  name: 'newsletter'
};

module.exports = {
  register
};
