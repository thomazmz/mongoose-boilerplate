const express = require('express');

const application = express(); 

application.get('/', (req, res) => {
    redisClient.get(redisClient.get('visits', (err, visits) => {
        res.send('Hello World!');
    }));
});

module.exports = application;