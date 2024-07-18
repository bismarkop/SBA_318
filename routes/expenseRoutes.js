const express = require("express");
const router = express.Router();

const expenses = require("../data/expenses")

router
  .route("/")
  .get((req, res) => {
    res.json(expenses);
  })


module.exports = router;