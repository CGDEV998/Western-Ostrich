'use strict';
const express = require('express');
const { Client } = require('pg');
const router = express.Router();

function getWatched (username) {
    const client = new Client({
        connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
      });
    
      client.connect();
      return client.query(`
        SELECT media.* FROM media
        INNER JOIN users_watched ON users_watched.media_id = media.id
        INNER JOIN users ON users.id = users_watched.user_id
        WHERE users.username = $1
        `, [username]);
};

function getToWatch (username) {
    const client = new Client({
        connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
      });
    
      client.connect();
      return client.query(`
        SELECT media.* FROM media
        INNER JOIN users_to_watch ON users_to_watch.media_id = media.id
        INNER JOIN users ON users.id = users_to_watch.user_id
        WHERE users.username = $1
      `, [username]);      
};

module.exports = {
    getWatched: getWatched,
    getToWatch: getToWatch,
  };