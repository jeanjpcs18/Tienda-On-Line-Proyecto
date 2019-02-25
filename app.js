require("dotenv").config();
var createError = require('http-errors');

var bodyParser=require('body-parser');

var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport=require('passport');

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



app.use(session({
  secret: 'I Love Software...',
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize()); 
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



//modelos
var models= require('./models');
models.sequelize.sync().then( ()=> {
	console.log('Se ha conectado la base');
}).catch(err => {console.log(err, "Hubo un error");});

require('./config/pasaporte/passport')(passport, models.cuenta, models.persona, models.rol);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
