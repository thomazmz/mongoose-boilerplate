const express = require("express");
const controllers = require("./controllers");
const validators = require("./validators");
const { validationResult } = require("express-validator");

const router = express.Router();

router.get('/', controllers.findAll);

router.get('/:id', controllers.findOneById);

router.delete('/:id', controllers.delete);

router.post('/signin', validators.signIn, controllers.signIn);

router.post('/signup', validators.signUp, controllers.signUp);

module.exports = router;