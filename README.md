# barcodedudeend

Tutorial on how to make a REST API using Node.js with MongoDB

Backend for BarcodeDude app, in Node.js

##Initial Steps
1. npm init
2. install Express
3. Install Gulp globally to be able to access it from the command line (npm install gulp -g --save)
4. touch gulpfile.js
5. Install nodemon for gulp (npm install gulp-nodemon --save)

##Add typings
* npm install tsd@next -g
* in local folder 
    * tsd install node
    * tsd install express
    * tsd install gulp
    * tsd install gulp-nodemon


## Setup gulp task to run nodemon
Install 
* gulp-env as dev dependancy

`npm install --save-dev gulp-env`


In gulpfile.js

```javascript
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
```

Setup gulp task

```javascript
//setup gulp task
gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting');
    });
});
```

## Make app skeleton
In app.js

```javascript
var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
    res.send('Welcome to my API v.1');
});

app.listen(port, function() {
    console.log('Gulp is running my app.js on port:' + port);
});
```

Run app with gulp

##MongoDB and Mongoose

###Install Mongoose

`npm install --save mongoose`

###Connect to local MogoDB with Mongoose

MongoDB - use local or mongolab.

in app.js

```javascript
var express = require('express');
var mongoose = require('mongoose');

var db;
//connect to mongoDB, and if it does not exist it will create it, test or production
if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/barcodedudeAPI_test');
} else{
    db = mongoose.connect('mongodb://localhost/barcodedudeAPI');
}

var app = express();

var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
    res.send('Welcome to my API v.1');
});

app.listen(port, function() {
    console.log('Gulp is running my app.js on port:' + port);
});

```
###Run MongoDb, if local
`mongod`

Run the app with gulp to make sure that mongo is running.

##Models
Make models dir

`mkdir models`

###Make ScanItem model

Make new file in models ScanItem.js

Fetch the Schema Mongoose object

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
```

Make ScanItem Schema

```javascript
var ScanItemModel = new Schema({
    text: {type: String, required: true},
    format: {type: String, required: true},
    author: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    hyperlink: {type: Boolean, default:false},
    correct: {type: Boolean, default:false}
});
```

Export it

```javascript
module.exports= mongoose.model('ScanItem', ScanItemModel);
```

###Use it in app.js

```javascript
//fetch model
var ScanItem = require('./models/ScanItem');
```
##Use Body Parser

Body parser enables you to send JSONs in body

###Install body-parser

`npm install --save body-parser`

###Use it in app.js

require it

```javascript
var bodyParser = require('body-parser');
```

use it

```javascript
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
```

##Make Router

Make routes dir

`mkdir routes`

###Make scanItemRoutes

Make scanItemRoutes.js in routes dir.

code:

```javascript
var express = require('express');

var routes = function(ScanItem) {
    //make router
    var scanItemRouter = express.Router();
    return scanItemRouter;
};

module.exports = routes;
```

This router does nothing yet, but ScanItem model will be injected by the app.

in app.js

```javascript
//injecting a ScanItem model into scanItemRouter constructor
var scanItemRouter = require('./routes/scanItemRoutes')(ScanItem);
app.use('/api/scanItems', scanItemRouter); 
```









