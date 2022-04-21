const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
  database: 'koalas',
  host: 'localhost'
});

pool.on('connect', () => {
  console.log('Yay! We are talking to our postgresql database!');
})

pool.on('error', (error) => {
  console.log('Something with postgresql really broke. It broke hard.', error);
})

// GET

router.get('/', (req, res) => {
    console.log('GET /koalas');
    let queryText = `
      SELECT * FROM "koalas"
        ORDER BY "id";
    `;
    pool.query(queryText)
      .then((dbResult) => {
        // console.log('here are the rows that our SQL query asked for:');
        // console.log(dbResult.rows);
        res.send(dbResult.rows);
      })
      .catch((dbError) => {
        console.log('error in GET /songs db request:', dbError);
        res.sendStatus(500);
      })
  });
  


// POST


// PUT


// DELETE

module.exports = koalaRouter;