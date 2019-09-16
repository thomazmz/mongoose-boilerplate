const express = require("express");

const User = require("../models/user")

const router = express.Router();

router.get('/', function (req, res) {
    User.find()
    .exec()
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send(err));
});

router.post('/signup', (req, res) => {
    let user = new User(req.body);
    user.isAvailable()
    .then(user => user.hashPassword())
    .then(user => user.save())
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
});

router.post('/signin', (req, res) => {
    User.verifyCredentials(req.body.identifiable, req.body.password)
    .then(user => user.getBarearToken)
    .then(token => res.status(200).send(token))
    .catch(err => res.status(500).send(err))
});

router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id)
    .exec()
    .then(user => res.status(200).send())
    .catch(err => res.status(500).send(err));
});

module.exports = router;