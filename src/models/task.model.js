const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
  description: {
    Type: String,
    required: true,
  },
  isCompleted: {
    Type: String,
    default: false,
  },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
