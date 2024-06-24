const express = require("express");

const TaskRouter = require("../controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  return new TaskRouter(req, res).getAll();
});

router.get("/:id", async (req, res) => {
  return new TaskRouter(req, res).getById();
});

router.patch("/:id", async (req, res) => {
  return new TaskRouter(req, res).update();
});

router.post("/", async (req, res) => {
  return new TaskRouter(req, res).create();
});

router.delete("/:id", async (req, res) => {
  return new TaskRouter(req, res).delete();
});

module.exports = router;
