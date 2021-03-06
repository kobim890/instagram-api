const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./config/routes');
const cookieParser = require('cookie-parser');
const config = require('./config/env/index')


const app = express();
const port = 4000;

connect();

app.use(cors({
    origin: true,
    credentials:true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(routes);


function listen(){
    app.listen(port, ()=> console.log(`Server is listening on port ${port}!`))
}


function connect(){
    mongoose.connect(config.dbUrl,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    });
    const db = mongoose.connection;
    db.on('error', err => console.log(err));
    db.once('open', listen);
}

