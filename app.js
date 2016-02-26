var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
    res.send('Welcome to my API v.1');
});

app.listen(port, function() {
    console.log('Gulp is running my app.js on port:' + port);
});
