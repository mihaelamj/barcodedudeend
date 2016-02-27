# barcodedudeend

Tutorial on how to make a REST API using Node.js with MongoDB

Backend for BarcodeDude iOS (Objective C) app, in Node.js.
BarcodeDude iOS app will be potred to Github later. Now it resides in private BitBucket repo.

The purpose of this app is to compare scanning engines for iOS, in terms of scanning time and accuracy.
For now I have two engines:

* [ZXingObjC](https://github.com/TheLevelUp/ZXingObjC)
* My Engine adopted form Oliver Drobnik's [book](https://www.manning.com/books/barcodes-with-ios)

There will be another, third, propritery engine added, which I will not post here, on GitHub. It will remain private on BitBucket.
So there will be two projects, which I will sync. One < than the other.

##Initial Steps
1. npm init
2. install Express
3. Install Gulp globally to be able to access it from the command line (npm install gulp -g --save)
4. touch gulpfile.js
5. Install nodemon for gulp (npm install gulp-nodemon --save)

##Add typings

Typings allow your IDE/Editor to provide intellisense.
I use Visual Studio Code, for it has Node.js debugger setup.

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

The image of the scanned barcode will be added later, and I will use AWS for that.

###Use it in app.js

```javascript
//fetch model
var ScanItem = require('./models/ScanItem');
```
##Use Body Parser

Body parser is middleware that allows Express to read the body, and then parse that into JSON object.

###Install body-parser

`npm install --save body-parser`

###Use it in app.js

require it

```javascript
var bodyParser = require('body-parser');
```

use it, url encoded, JSON

```javascript
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
```
Now bodyParser is going to look at the body and see if it has any JSON object in it.
If it does it's going to take that JSON object and if it does it's going to add it to req.body.
We can use that JSON object to create new ScanItem object.

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

The line
```javascript
app.use('/api/scanItems', scanItemRouter); 
```

sets our API path to be:
`/api/scanItems/`

So the scanItemRouter starts from that path. We may change it whenever we like, in app.js, and nothing need to be changed in scanItemRoutes.js.

### Filtering with Query String
Query string in the url looks like:

`http://localhost:8000/api/scanItems?author=mmj`

Express is going to package the query string parameters into a JSON in req.query, so that it becomes:

```JSON
req.query = 
{
	author: 'mmj'
}
```
That's how we do filtering.

###Add more routes

##Use Postman Chrome extension


##Make Controller
We will handle routing via controller

`mkdir controller`

In controller dir

`touch scanItemController.js`









