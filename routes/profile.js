'use strict';

const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: '5432',
    database: 'western_ostrich'
};

const pool = new Pool(config);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

function getProfile(req, res, username) {
    pool.connect((err, client, done) => {
        if (err) throw ('Could not connect to database', err);
        return client.query('SELECT * FROM users WHERE username = $1', [username], (err, queryRes) => {
            done();

            if (err) {
                res.status(500).send('Database Error: ', err.stack);
            };

            if (queryRes.rowCount === 0) {
                res.status(404).redirect('/pages/404');
            }
            res.status(200).send(queryRes.rows[0]);
        });
        
    });
};

module.exports = () => {
    router.get('/profile/:username', (req, res) => {
        const username = req.params.username;
        getProfile(req, res, username);
    });

    return router;
};
