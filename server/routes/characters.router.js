const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

// GET Route
router.get("/all", (req, res) => {
  const queryText = `SELECT ch.*, cl.classname, cm.initiative, cm.has_initiative, cm.extra_time_pool FROM character ch 
    INNER JOIN class cl on ch.class_id = cl.id 
    INNER JOIN combat cm on cm.character_id = ch.id`;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});

// GET Route
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const queryText =
    "SELECT ch.*, cl.classname FROM character ch INNER JOIN class cl on ch.class_id = cl.id INNER JOIN campaign cm on ch.campaign_id = cm.id where ch.id = $1";
  pool
    .query(queryText, [id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
// GET Route
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const current_hitpoints = req.body.current_hitpoints;
  console.log("id:", id, "current hitpoints: ", current_hitpoints);
  const queryText = "UPDATE character set current_hitpoints = $1 where id = $2";
  pool
    .query(queryText, [current_hitpoints, id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
module.exports = router;
