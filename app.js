var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

var { init } = require('./db.js');

init();

var usersRouter = require('./routes/users');
var companyRouter = require('./routes/company');
var departmentRouter = require('./routes/department');
const employeTypeRouter = require('./routes/employeType');
const addressRouter = require('./routes/address');
const leaveRouter = require('./routes/leave');

var app = express();
app.use(fileUpload());
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/company', companyRouter);
app.use('/department', departmentRouter);
app.use('/employetype', employeTypeRouter);
app.use('/address', addressRouter);
app.use('/leave', leaveRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
