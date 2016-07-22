var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io')();
// var laborLive =require('./laborLive');
// io.socket.set('transports', [
//   'websocket',
//   'flashsocket',
//   'htmlfile',
//   'xhr-polling',
//   'jsonp-polling'
// ]);
io.sockets.on('connection', function (socket) {
    console.log('client connect');
    // laborLive.WSConstruct(socket);
    socket.on('toClient', function (data) {
      // we tell the client to execute 'new message'
      console.log("server to client!");
      socket.broadcast.emit('news', {
        hello: data
      });
    });
    // socket.emit('news', { hello: 'world' });
    // socket.on('echo', function (data) {
    // io.sockets.emit('message', data);
    // });
});

var routes = require('./routes/index');
var users = require('./routes/users');
var apis = require('./routes/apis');
var hots  = require('./routes/hots');

// var websockets  = require('./routes/websockets');
var app = express();
app.io  = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// default options
app.use(fileUpload());

app.use('/', routes);
app.use('/users', users);
app.use('/api', apis);
app.use('/hots', hots);
// app.use('/ws',websockets);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
