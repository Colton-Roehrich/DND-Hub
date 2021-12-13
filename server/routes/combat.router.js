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
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
router.put("/extraPool/", (req, res) => {
  const extraPool = req.body.extraPool;
  const queryText = "UPDATE combat set extra_time_pool = $1 ";
  pool
    .query(queryText, [extraPool])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
router.post("/", (req, res) => {
  const character_id = req.body.id;
  console.log("character id:", character_id);
  const queryText =
    "INSERT INTO combat(character_id, initiative, has_initiative, extra_time_pool) VALUES ($1,-5,false,0) returning id";
  pool
    .query(queryText, [character_id])
    .then(result => {
      console.log("combat insert result:", result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
router.delete("/:character_id", (req, res) => {
  const character_id = req.params.character_id;
  console.log("character id:", character_id);
  const queryText = "DELETE FROM combat WHERE character_id = $1";
  pool
    .query(queryText, [character_id])
    .then(result => {
      console.log("combat insert result:", result.rows);
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error while making query: ${queryText}\n`);
      res.sendStatus(500);
    });
});
module.exports = router;
