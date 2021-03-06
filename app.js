var express = require('express');
var path = require('path');
var logger = require('morgan');
var multipart = require("connect-multiparty")	
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var timestamp = require('./routes/timestamp/index');
var headerparser = require('./routes/headerparser/index');
var shortener = require('./routes/shortener/index');
var imagesearch = require('./routes/imagesearch/index');
var filemetadata = require('./routes/filemetadata/index');
var voting = require('./routes/voting/index');
var stockmarket = require('./routes/stockmarket/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(multipart({uploadDir:path.join(__dirname, 'uploads' )}));

app.use('/api/timestamp', timestamp);
app.use('/api/whoami', headerparser);
app.use('/api/shortener', shortener);
app.use('/api/imagesearch', imagesearch);
app.use('/api/filemetadata', filemetadata);

app.use('/voting', voting);
app.use('/stockmarket', stockmarket);

// Global Names
global.names = [];

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
