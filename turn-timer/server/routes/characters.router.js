const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET Route
router.get('/all', (req, res) => {
    const queryText = 'SELECT ch.*, cl.classname FROM character ch INNER JOIN class cl on ch.class = cl.id';
    pool
        .query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error while making query: ${queryText}\nERRCODE: ${error}`);
            res.sendStatus(500);
        })

});

module.exports = router;