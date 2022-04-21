const { Router } = require('express');
const express = require('express');
const { Pool } = require('pg/lib');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST
router.post('/', (req,res)=>{
    let sqlQuery = `
        INSERT INTO "koalas"
        ("name", "gender", "age", "ready_to_transfer", "notes")
            VALUES
            ($1,$2,$3,$4,$5)
  `;
  let sqlValues = [
    req.body.name,
    req.body.gender,
    req.body.age,
    req.body.ready_to_transfer,
    req.body.notes
  ];
Pool.query(sqlQuery, sqlValues) 
.then((dbResult) => {
    res.sendStatus(201);
  })
  .catch((dbError) => {
    console.log('error in POST /koalas db request:');
    console.log(dbError);
  })
});

// PUT


// DELETE

module.exports = koalaRouter;