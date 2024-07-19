const express = require("express");
const router = express.Router();

const expenses = require("../data/expenses");

router
  .route("/")
  .get((req, res) => {
    res.json(expenses);
  })
  .post((req, res) => {
    if (req.body.name && req.body.amount && req.body.date) {
      const expense = {
        id: expenses[expenses.length - 1].id + 1,
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
      };

      expenses.push(expense);
      res.json(expenses[expenses.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const expense = expenses.find((e) => e.id == req.params.id);
    if (expense) res.json(expense);
    else next();
  })
  .delete((req, res, next) => {
    const expense = expenses.find((e, i) => {
      if (e.id == req.params.id) {
        expenses.splice(i, 1);
        return true;
      }
    });

    if (expense) res.json(expense);
    else next();
  });

// router.delete("/:id", (req, res, next) => {
//   const expense = expenses.find((e, i) => {
//     if (e.id === req.params.id) {
//       expenses.splice(i, 1);
//       return true;
//     }
//   });

//   if (expense) res.json(expense);
//   else next();
// });
module.exports = router;
