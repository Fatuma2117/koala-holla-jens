const { Router } = require('express');
const express = require('express');
const { sendStatus } = require('express/lib/response');
const { Pool } = require('pg/lib');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


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

module.exports = koalaRouter;