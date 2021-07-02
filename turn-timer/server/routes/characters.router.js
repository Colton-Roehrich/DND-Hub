const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET Route
router.get('/all', (req, res) => {
    const queryText = `SELECT ch.*, cl.classname, cm.initiative FROM character ch 
    INNER JOIN class cl on ch.class_id = cl.id 
    INNER JOIN combat cm on cm.character_id = ch.id`;
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

// GET Route
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const queryText = 'SELECT ch.*, cl.classname FROM character ch INNER JOIN class cl on ch.class_id = cl.id INNER JOIN campaign cm on ch.campaign_id = cm.id where ch.id = $1';
    pool
        .query(queryText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error while making query: ${queryText}\nERRCODE: ${error}`);
            res.sendStatus(500);
        })

});
module.exports = router;