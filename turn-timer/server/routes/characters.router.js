const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET Route
router.get('/all', (req, res) => {
    res.send([
        {name:"Fred", hitpoints:113, armorClass:15},
        {name:"Shiro",  hitpoints:74, armorClass:13},
        {name:"Laxog",  hitpoints:99, armorClass:22},
        {name:"Yaza",  hitpoints:89, armorClass:17},
        {name:"Wren",  hitpoints:58, armorClass:12},
        {name:"Proto",  hitpoints:113, armorClass:15},]);
    const queryText = 'SELECT username, min(recordtime) FROM winners GROUP BY username ORDER BY min(recordtime) ASC LIMIT 15;';
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