const express = require('express');

const applicationPort = 8090;

const app = express(); 

app.get('/', (req, res) => {
 res.send('Hi There!');
});

app.listen(applicationPort, () => {
    console.log('Listening on port ' + applicationPort);
});