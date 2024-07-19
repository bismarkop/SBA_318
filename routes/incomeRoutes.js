const express = require("express");
const router = express.Router();

const incomes = require("../data/incomes");

router
  .route("/")
  .get((req, res) => {
    res.json(incomes);
  })
  .post((req, res) => {
    if (req.body.id && req.body.name && req.body.amount && req.body.date) {
      const income = {
        id: incomes[incomes.length - 1].id + 1,
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
      };

      incomes.push(income);
      res.json(incomes[incomes.length - 1]);
    }
    else res.json({ error: "Insufficient Data" });
  })

router
  .route("/:id")
  .get((req, res, next) => {
    const income = incomes.find((i) => i.id == req.params.id);
    if (income) res.json(income);
    else next();
  })
  .delete((req, res, next) => {
    const income = incomes.find((e, i) => {
      if (e.id == req.params.id) {
        incomes.splice(i, 1);
        return true;
      }
    });

    if (income) res.json(income);
    else next()
  });
  
module.exports = router;