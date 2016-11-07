'use strict';

const Vision = require('vision');
const Inert = require('inert');

const newsletterPlugin = require('server/plugins/newsletter');
const reactPlugin = require('server/plugins/react');

const plugins = [
  Vision,
  Inert,
  newsletterPlugin,
  reactPlugin
];

module.exports = plugins;
