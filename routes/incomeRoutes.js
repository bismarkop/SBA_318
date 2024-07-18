const express = require("express");
const router = express.Router();

const income = require("../data/income");

router
  .route("/")
  .get((req, res) => {
    res.json(income);
  })

router
  .route("/:id")
  .get((req, res, next) => {
    const income = income.find((i) => i.id == req.params.id);
    if (income) res.json(income);
    else next();
  })
  
module.exports = router;