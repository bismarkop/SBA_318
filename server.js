const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.json());


app.use((req, res, next) => {
  const time = new Date();

  console.log(`-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}`);

  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/transactions", (req, res) => {
  res.render("transactions");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
