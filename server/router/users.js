var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../model/user.model.js');
const User = model.getModel('user')

const DB_URL = 'mongodb://localhost:27017/react'

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function () {
  console.log("mongodb connected success.")
});
// 链接失败;
mongoose.connection.on('error', function () {
  console.log("mongodb connected fail.")
});
// 链接断开
mongoose.connection.on('disconnceted', function () {
  console.log("mongodb connected disconnceted.")
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({msg: 'this is /'});
});
// 
router.get('/info', function(req, res, next) {
  res.json({code: 0});
});
// 注册页面
router.post('/regiseter', function(req, res, next) {
  console.log(`参数是${req.body}`)
  const {user, pwd, type} = req.body;
  console.log({user, pwd, type})
  User.findOne({user:user}, function(err,doc){
    if(doc){
      return res.json({
        code: 1,
        msg: '该用户已经被注册'
      })
    }else if(err){
        return res.json({
    code: 0,
    code2: {user, pwd, type}
  })
    }
    User.create({user, pwd, type},function(e,d){
      if (e){
        return res.json({
          code: 1.1,
          msg: '数据库抽风,请联系管理员'
        })
      }
      return res.json({
        code: 0,
        msg: '注册成功'
      })
    })
  })
  
  // return res.json({
  //   code: 0,
  //   code2: {user, pwd, type}
  // })
});
// 这里是测试需要;
router.get('/list', function(req, res, next) {
  User.find({},function(err,doc){
    res.json({
      code: 0,
      doc: doc
    });
  })
});

module.exports = router; 
