const express = require("express");
const TaskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dados = await TaskModel.find({});
    res.status(200).send(dados);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deleteTask = await TaskModel.findByIdAndDelete(taskId);
    res.status(200).send(deleteTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
