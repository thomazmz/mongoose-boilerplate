const express = require('express');
const bodyParser = require('body-parser')

const Todo = require('./model/todo');

const application = express(); 

application.use(bodyParser.json())

application.get('/', (req, res) => {
    res.send('To Do Application!');
});

application.get('/todo', function (req, res) {
    Todo.find()
    .exec()
    .then(todos => res.send(todos))
    .catch(err => res.send(err));
});
  
application.post('/todo', function (req, res) {
    const todo = new Todo(req.body);
    todo.save()
    .then((persistedTodo) => res.status(201).send(persistedTodo))
    .catch(err => res.status(400).send(err));
});

application.patch('/todo/:id', function(req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .exec()
    .then(todo => res.status(200).send(todo))
    .catch(err => res.status(500).send(err));
});

application.delete('/todo/:id', function(req, res) {
    Todo.findByIdAndRemove(req.params.id)
    .exec()
    .then(todo => res.status(200).send())
    .catch(err => res.status(500).send(err));
})

module.exports = application;