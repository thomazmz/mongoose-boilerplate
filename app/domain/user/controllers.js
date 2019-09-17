const { validationResult } = require('express-validator');

var User = require('./model');

module.exports = {

    signUp: function(req, res) {
        let user = new User(req.body);
        User.findOneByEmail(user.email)
        .then(result => !result ? User.findOneByUsername(user.username) : res.status(500).send("Email is already talken"))
        .then(result => !result ? user.hashPassword() : res.status(500).send("Username is already talken"))
        .then(user => user.save())
        .then(user => user.getBarearToken())
        .then(token => res.status(200).send(token))
        .catch(err => res.status(500).send("Internal server error"));
    },

    signIn: function(req, res) {
        User.findOneByUniqueIdentifier(req.body.identifier)
        .then(user => user ? User.verifyCredentials(user, req.body.password) : res.status(400).send("Invalid credentials"))
        .then(user => user ? user.getBarearToken() : res.status(400).send("Invalid credentials"))
        .then(token => res.status(200).send(token))
        .catch(err => res.status(500).send("Internal server error"));
    },

    findAll: function(req, res) {
        User.find().exec()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send(err));
    },

    findOneById: function(req, res) {
        User.findOneById(req.params.id).exec()
        .then(user => user ? res.status(200).send(user) : res.status(204).send("Could not find any correspondent user"))
        .catch(err => res.status(500).send("Internal server error"));
    },

    delete: function(req, res) {
        User.findByIdAndRemove(req.params.id).exec()
        .then(user => res.status(200).send("User removed successfully"))
        .catch(err => res.status(500).send("Internal server error"));
    }

}