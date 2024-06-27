const express = require("express");
const dotenv = require("dotenv");

const TaskRouter = require("./src/routes/task.routes");
const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

app.use("/tasks", TaskRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port} !`));
