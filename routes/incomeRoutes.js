const express = require("express");
const router = express.Router();

const income = require("../data/income");

router
  .route("/")
  .get((req, res) => {
    res.json(income);
  })
  .post((req, res) => {
    if (req.body.id && req.body.name && req.body.amount && req.body.date) {
      const expense = {
        id: expense[expense.length - 1].id +1,
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
      };

      expenses.push(expense);
      res.json(expenses[expenses.length - 1]);
    }
    else res.json({ error: "Insufficient Data" });
  })

router
  .route("/:id")
  .get((req, res, next) => {
    const income = income.find((i) => i.id == req.params.id);
    if (income) res.json(income);
    else next();
  })
  
module.exports = router;