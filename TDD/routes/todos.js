var express = require("express");
var router = express.Router();
var createError = require("http-errors");

const todos = [{ id: 1, name: "Do something", completed: false }];

// /todos/
router.get("/", function (req, res, next) {
  res.json(todos);
});

router.get("/:id", function (req, res, next) {
  const foundTodo = todos.find((todo) => todo.id === Number(req.params.id));

  if (!foundTodo) {
    // 404
    return next(createError(404, "Not Found"));
  }

  res.json(foundTodo);
});

router.post("/", function (req, res, next) {
  const { body } = req;

  if (typeof body.name !== "string") {
    return next(createError(422, "Validation Error"));
  }

  const newTodo = {
    id: todos.length + 1,
    name: body.name,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

router.put("/:id", function (req, res, next) {
  const { body } = req;
  const todoIndex = todos.findIndex((todo) => todo.id == Number(req.params.id));

  todos[todoIndex].name = body.name;
  todos[todoIndex].completed = body.completed;

  const updatedTodo = todos[todoIndex];

  res.status(201).json(updatedTodo);
});

module.exports = router;
