if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//Routes
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // links to views folder
app.set('layout', 'layouts/layout'); // is basicallu the partials folder
app.use(expressLayouts); // telling it to use the express layouts
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('error', error => console.log('CONNECTED TO MONGOOSE'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, function(){
    console.log('SERVER HAS STARTED!!');
});