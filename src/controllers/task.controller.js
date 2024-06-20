const TaskModel = require("../models/task.model");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    try {
      const dados = await TaskModel.find({});
      this.res.status(200).send(dados);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;

      const task = await TaskModel.findById(taskId);

      if (!task) {
        return this.res.status(404).send("Essa tarefa não existe ");
      }

      return this.res.status(200).send(task);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const TaskData = this.req.body;

      const TaskToUpdate = await TaskModel.findById(taskId);

      const allowedUpdates = ["isCompleted"];
      const requestUpdates = Object.keys(TaskData);

      for (const update of requestUpdates) {
        if (allowedUpdates.includes(update)) {
          TaskToUpdate[update] = TaskData[update];
        } else {
          return this.res
            .status(500)
            .send("Um ou mais campos inseridos não são editaveis!");
        }
      }

      await TaskToUpdate.save();
      return this.res.status(200).send(TaskToUpdate);
    } catch (error) {
      return this.res.status(500).send(error.message);
    }
  }

  async create() {
    try {
      const newTask = new TaskModel(this.req.body);
      await newTask.save();
      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async delete() {
    try {
      const taskId = this.req.params.id;
      const deleteTask = await TaskModel.findByIdAndDelete(taskId);
      this.res.status(200).send(deleteTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;
