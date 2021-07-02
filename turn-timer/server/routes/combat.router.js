const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET Route
router.put('/', (req, res) => {
    const id = req.body.player_id;
    const initiative = req.body.initiative;
    const queryText = 'UPDATE combat set initiative = $1 where character_id = $2';
    console.log(req);
    pool
        .query(queryText, [initiative,id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error while making query: ${queryText}\nERRCODE: ${error}`);
            res.sendStatus(500);
        })

});
module.exports = router;