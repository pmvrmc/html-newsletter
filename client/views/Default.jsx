'use strict';

import React from 'react';

const Default = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />
        </head>
        <body>
          <div id='app' />
          <script src='js/bundle.js' />
        </body>
      </html>
    );
  }
});

module.exports = Default;
