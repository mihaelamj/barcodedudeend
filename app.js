var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;
//connect to mongoDB, and if it does not exist it will create it, test or production
if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/barcodedudeAPI_test');
} else{
    db = mongoose.connect('mongodb://localhost/barcodedudeAPI');
}

//fetch model
var ScanItem = require('./models/ScanItem');

var app = express();
//use body parser urlencoded, must be before json, or the app will hang
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//injecting a ScanItem model into scanItemRouter constructor
var scanItemRouter = require('./routes/scanItemRoutes')(ScanItem);
app.use('/api/scanItems', scanItemRouter); 

var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
    res.send('Welcome to my API v.1');
});

app.listen(port, function() {
    console.log('Gulp is running my app.js on port:' + port);
});
