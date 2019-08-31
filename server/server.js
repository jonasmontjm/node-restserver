require('./config/config');
const express = require('express');
const app = express();
app.use(require('./routes/index'));
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded



mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


app.listen(process.env.PORT, function() {
    console.log('Escuchando Puerto!', process.env.PORT);
});