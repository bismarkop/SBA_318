const express = require("express");
const router = express.Router();

const income = require("../data/income")

router
  .route("/")
  .get((req, res) => {
    res.json(income);
  })


module.exports = router;