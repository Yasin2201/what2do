const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/user/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    res.json(result)
  } catch (err) {
    console.error("error executing query:", err);
  } 
})

app.post('/signup', async (req, res) => {
  try {
    const result = await prisma.user.create({
      data: {
        username: req.body.username
      },
    })
    res.json(result)
  } catch (err) {
    console.error("error executing query:", err);
  } 
})

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
