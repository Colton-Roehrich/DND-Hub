const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

// GET Route
router.get("/active", (req, res) => {
  const queryText = `SELECT ch.*, cm.initiative, cm.has_initiative, cm.extra_time_pool, cm.status_effect, cm.status_effect_time FROM character ch 
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

router.get("/inactive/", (req, res) => {
  const queryText =
    "SELECT * FROM character where character.id not in (select character_id from combat)";
  pool
    .query(queryText)
    .then(result => {
      console.log(result.rows);
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
  const dead = req.body.dead;
  console.log("id:", id, "current hitpoints: ", current_hitpoints);
  const queryText =
    "UPDATE character set current_hitpoints = $1, dead=$2 where id = $3";
  pool
    .query(queryText, [current_hitpoints, dead, id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
// GET Route
router.post("/", (req, res) => {
  const current_hitpoints = req.body.current_hitpoints;
  const armor_class = req.body.armor_class;
  const nickname = req.body.nickname;
  console.log("nickname:", nickname, "current hitpoints: ", current_hitpoints);
  const queryText =
    "INSERT INTO character(nickname, armor_class, current_hitpoints) values($1,$2,$3) returning id";
  pool
    .query(queryText, [nickname, armor_class, current_hitpoints])
    .then(result => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
module.exports = router;
