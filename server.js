const mongoose = require('mongoose');
const app = require('./app');

const MONGO_PROPERTIES = { useNewUrlParser: true, useUnifiedTopology: true }
const MONGO_URI = 'mongodb://mongo/application';
const APPLICATION_PORT = 8090;

mongoose.connect(MONGO_URI, MONGO_PROPERTIES).then(() => {
    app.listen(APPLICATION_PORT);
}, err => {
    console.log(err);    
});



