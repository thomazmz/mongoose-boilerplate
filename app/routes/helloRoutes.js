const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from ToDo Application!');
});

module.exports = router;
