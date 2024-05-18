const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDataBase();

app.get("/tasks", (req, res) => {
  const dados = [{ descrition: "Estudar", isCompleted: true }];

  res.status(200).send(dados);
});

app.listen(8000, () => console.log("listening on port 8000"));
