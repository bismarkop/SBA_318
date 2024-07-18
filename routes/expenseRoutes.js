const express = require("express");
const router = express.Router();

const expenses = require("../data/expenses");

router
  .route("/")
  .get((req, res) => {
    res.json(expenses);
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


module.exports = router;