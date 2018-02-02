var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
const nodemailer = require('nodemailer');


//controllers
const emailCtrl = require("./api/controllers/emailController.js");

const dataa = {
	email: 'newmanp15@gmail.com',
	password: 'Florida4545'
};

//setInterval(function(){
//  emailCtrl.sendEmail(dataa)
//}, 1500 * 3); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/app', express.static(path.join(__dirname, '../client/app/')));
app.use('/scripts', express.static(path.join(__dirname, '../client/app/public/scripts')));
app.use('/css', express.static(path.join(__dirname, '../client/app/public/css')));
app.use('/fonts', express.static(path.join(__dirname, '../client/app/public/fonts')));
app.use('/images', express.static(path.join(__dirname, '../client/app/public/img')));
app.use('/products', express.static(path.join(__dirname, './products')));
app.use('/components', express.static(path.join(__dirname, '../client/app/public/components')));
app.use('/bower_components', express.static(path.join(__dirname, './bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));
app.use('/public', express.static(path.join(__dirname, '../client/app/public')));
app.use('/views', express.static(path.join(__dirname, '../client/app/public/views')));


app.use('/users', users);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/app/index.html'));
});

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
