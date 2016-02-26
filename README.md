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
In gulpfile.js

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```javascript
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
```

