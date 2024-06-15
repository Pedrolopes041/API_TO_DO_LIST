const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

connectToDataBase();

app.get("/tasks", async (req, res) => {
  try {
    const dados = await TaskModel.find({});
    res.status(200).send(dados);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).send("Essa tarefa não existe ");
    }

    return res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const TaskData = req.body;

    const TaskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestUpdates = Object.keys(TaskData);

    for (update of requestUpdates) {
      if (allowedUpdates.includes(update)) {
        TaskToUpdate[update] = TaskData[update];
      } else {
        return res
          .status(500)
          .send("Um ou mais campos inseridos não são editaveis!");
      }
    }

    await TaskToUpdate.save();
    return res.status(200).send(TaskToUpdate);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deleteTask = await TaskModel.findByIdAndDelete(taskId);
    res.status(200).send(deleteTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(8000, () => console.log("listening on port 8000"));
