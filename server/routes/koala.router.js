const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST
router.post('/', (req,res)=>{
    let sqlQuery = `
        INSERT INTO "koalas"
            ("name", "gender", "age", "ready_to_transfer", "notes")
  `;
})




// PUT


// DELETE

module.exports = koalaRouter;