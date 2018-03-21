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
router.get('/info', function(req, res, next) {
  res.json({code: 0});
});
router.post('/regiseter', function(req, res, next) {
  res.json({code: 0});
});

router.get('/list', function(req, res, next) {
  User.find({},function(err,doc){
    res.json({
      code: 0,
      doc: doc
    });
  })
});

module.exports = router; 
