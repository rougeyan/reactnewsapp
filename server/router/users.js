var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../model/user.model.js');
var cookieParser = require('cookie-parser');
const utils = require('utility')

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
function md5Pwd(pwd) {
  const salt = 'keepon';
  return utils.md5(pwd + salt);
}
// 常量作为第二条件过滤
const _filter ={'pwd':0,'__v':0}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({msg: 'this is /'});
});
// 
router.get('/info', function(req, res, next) {
  const {userid} = req.cookies
  if(!userid){
    return res.json({
      code:1
    })
  }
  User.findOne({_id:userid},_filter,function(err,doc) {
    if(err){
      return res.json({
        code:1, 
        msg:'服务器抽风,请联系管理员'
      })
    }
    if(doc){
      return res.json({
        code:0, 
        data:doc
      })
    }
  })
  // res.json({code: 0});
});
// 注册页面
router.post('/regiseter', function(req, res, next) {
  console.log(`参数是${req.body}`)
  const {user, pwd, type} = req.body;
  console.log({user, pwd, type})
  User.findOne({user:user},_filter,function(err,doc){
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
    User.create({user, pwd:md5Pwd(pwd), type},function(e,d){
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
router.post('/login', function(req, res, next) {
  const {user,pwd} = req.body;
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
    // 第二个参数吧查找到的pwd 要返回的设置为0
    // 那么pwd 就不显示了;
    //如果找不到
    if(!doc){ 
      return res.json({
        code: 1,
        msg: '用户不存在或者密码错误'
      })
    }
    // 这里返回给浏览器cookies
    res.cookie('userid',doc._id,{
      path:'/',
      maxAge: 1000*60*60
    })
    return res.json({
      code: 0,
      data: doc
    })
  }
)})
    
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
