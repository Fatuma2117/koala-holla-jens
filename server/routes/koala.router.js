const express = require('express');
const router = express.Router();
// const koalaRouter = express.Router();
console.log('in router');
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
        console.log('here are the rows that our SQL query asked for:');
        console.log(dbResult.rows);
        res.send(dbResult.rows);
      })
      .catch((dbError) => {
        console.log('error in GET /songs db request:', dbError);
        res.sendStatus(500);
      })
  });
  


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
  console.log(sqlValues);
pool.query(sqlQuery, sqlValues) 
.then((dbResult) => {
    res.sendStatus(201);
  })
  .catch((dbError) => {
    console.log('error in POST /koalas db request:');
    console.log(dbError);
  })
});

// PUT
router.put('/:id', (req, res) => {
    let koalaToUpdate = req.params.id;
    let sqlQuery = `
    UPDATE "koalas"
        SET ready_to_transfer = 'true'
        WHERE id = $1
    `;
    let sqlValues = [koalaToUpdate];
    pool.query(sqlQuery, sqlValues)
    .then( dbResult => {
        res.send(dbResult)
    }
    )
    .catch(
        res.sendStatus(500)
    )
})

// DELETE

module.exports = router;