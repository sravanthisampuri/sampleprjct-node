
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
let jwt = require('jsonwebtoken')

// let chalk = require('chalk');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


// require('./server/config/libs/mongoose');//initializing mongoose

let config = require('./server/config/config');
/* CORS ISSUE */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header("Access-Control-Allow-Origin", "*");
    // // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,authorization,Content-Type,Access-Control-Request-Headers,enctype');

    // // Set to true if you need the website to include cookies in  requests
    res.setHeader('Access-Control-Allow-Credentials', false);

    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    }
    else {
        // Pass to next layer of middleware
        next();
    }
});
// ;
/* CORS */
mongoose.connect(config.db.mongo.uri)
let routesV1_0 = require('./server/routes/routes.v1.0');

app.use(
    function (req, res, next) {
        let token = req.headers.token;
        if (!token) {
            res.status(401).json({ status: false, message: "Unauthorized" });
        } else {
            jwt.verify(token, config.jwt.secret, function (err, decodedData) {
                if (err) {
                    res.status(500).json({ status: false, message: "Internal Server Error" })
                } else {
                    console.log(decodedData);
                    req.jwt = decodedData;
                    next();
                }
            })
        }
    }
)


app.use('/v1', routesV1_0);




app.listen(config.port);

console.log(('Server started on port : ' + config.port)); //+ " with " + process.env.NODE_ENV + ' mode'

module.exports = app;