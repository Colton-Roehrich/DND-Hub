const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

// GET Route
router.put("/", (req, res) => {
  const id = req.body.player_id;
  const initiative = req.body.initiative;
  const extraPool = req.body.extraPool;
  const has_initiative = req.body.has_initiative;
  console.log(id, initiative, has_initiative, extraPool);
  const queryText =
    "UPDATE combat set initiative = $1, has_initiative = $2, extra_time_pool = $3 where character_id = $4";
  pool
    .query(queryText, [initiative, has_initiative, extraPool, id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
module.exports = router;