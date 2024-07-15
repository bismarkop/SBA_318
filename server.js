const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs")

app.use("/public", express.static("public"))
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
  res.render("test");
});

app.get("/transactions", (req, res) => {
  res.render("transactions");
});

app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
