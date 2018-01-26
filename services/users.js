'use strict';
const express = require('express');
const { Client } = require('pg');
const router = express.Router();
const env = require('dotenv').config();

function getUser (username) {
  const client = new Client({
    connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
  });

  client.connect();
  return client.query(`SELECT * FROM users WHERE username = '${username}'`);
};

module.exports = {
  getUser: getUser
};
