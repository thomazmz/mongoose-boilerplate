const express = require("express");
const mongoose = require("mongoose");

const Todo = require("../models/todo");

const router = express.Router();

router.get('/', function (req, res) {
    Todo.find()
    .exec()
    .then(todos => res.send(todos))
    .catch(err => res.send(err));
});
  
router.post('/', function (req, res) {
    const todo = new Todo(req.body);
    todo.save()
    .then((persistedTodo) => res.status(201).send(persistedTodo))
    .catch(err => res.status(400).send(err));
});

router.patch('/:id', function(req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .exec()
    .then(todo => res.status(200).send(todo))
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', function(req, res) {
    Todo.findByIdAndRemove(req.params.id)
    .exec()
    .then(todo => res.status(200).send())
    .catch(err => res.status(500).send(err));
});

module.exports = router;