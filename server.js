global.express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const fileUpload = require('express-fileupload');

global.app = express();
global.jwt = require('jsonwebtoken');

app.use(fileUpload());
app.use(express.static('uploads'));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json({ limit: '100mb' }));

app.use(cors());

app.use(function (req, res, next) {
    console.info(`${req.method} ${req.originalUrl}`)
    var origin = req.headers.origin;

    res.header('access-control-allow-origin', origin);
    res.header("access-control-allow-credentials", "true");
    res.header("access-control-allow-headers", "x-requested-with");
    res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept,application/x-www-form-urlencoded,application/json,multipart/form-data");
    res.header("access-control-allow-headers", "true");

    next();
});

global.mongoose = require('mongoose');
mongoose.Promise = global.Promise;
global.connection = mongoose.createConnection("mongodb://127.0.0.1:27017/upmatrix");
global.Schema = mongoose.Schema;

app.listen(4000, function () {
    console.log(`listening on ${4000}...`);
});


require('./middleware');
require("./routes");