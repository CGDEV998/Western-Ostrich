'use strict';
const express = require('express');
const { Client } = require('pg');
const router = express.Router();

function getWatched (userId) {
    const client = new Client({
        // connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
        user: 'west_o',
        host: 'localhost',
        database: 'western_ostrich',
        password: 'pxxg',
        port: 5432,
      });
    
      client.connect();
      return client.query(`SELECT * FROM media INNER JOIN users_watched ON users_watched.media_id = media.id WHERE users_watched.user_id = '${userId}'`);
};

function getToWatch (userId) {
    const client = new Client({
        // connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
        user: 'west_o',
        host: 'localhost',
        database: 'western_ostrich',
        password: 'pxxg',
        port: 5432,
      });
    
      client.connect();
      return client.query(`SELECT * FROM media INNER JOIN users_to_watch ON users_to_watch.media_id = media.id WHERE users_to_watch.user_id = '${userId}'`);      
};

module.exports = {
    getWatched: getWatched,
    getToWatch: getToWatch,
  };