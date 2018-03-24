var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 引入个人部分
var users = require('./router/users')

var app = express();

var server = http.createServer(app);
var io = require('socket.io')(server);
var model = require('./model/user.model.js');
var Chat = model.getModel('chat')
// io 是全局的
io.on('connection', function(socket){
  console.log('user.login')
  //次次监听的客户端;
  socket.on('sendmsg',function(data){
    console.log(data);
    const {from,to,msg} = data;
    const chatid =[from, to].sort().join('_'); //定义唯一的聊天id
    // socket.emit('recvmsg',data); 
    Chat.create({
      chatid,
      from,
      to,
      content:msg
    },function(err,doc){
      // io 是全局
      io.emit('recvmsg',Object.assign({},doc._doc))// 这里跟es6 ...类似 doc._doc 就是整个doc的colletions
    })
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', users);

// 这里写个人的东西
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

module.exports = [app,server];
