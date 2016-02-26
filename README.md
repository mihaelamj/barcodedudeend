# barcodedudeend
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






