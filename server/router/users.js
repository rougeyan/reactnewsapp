var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../model/user.model.js');
var cookieParser = require('cookie-parser');
const utils = require('utility')

const User = model.getModel('user')

const Chat = model.getModel('chat')

// const LOCAL_DB_URL = 'mongodb://95.163.195.208:27017/react'
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
});


// 注册页面
router.post('/regiseter', function(req, res, next) {
  const {user, pwd, type} = req.body;
  User.findOne({user:user},function(err,doc){
    if(doc){
      return res.json({
        code: 1,
        msg: '该用户已经被注册'
      })
    }
    // 新的userMode 模型?不是很懂这个东西草他吗的?
    // 前面定义了 = const User = model.getModel('user')
    // mongoose.model(user) 
    // User 等于 mongoose.model(user,new mongoose.Schema(models[user]))
    // 之前是User create
    // 变成 UserModel.save
    // 这个UserModel 已经是colletion的部分的一个document?
    // 应该是吧?
    // userModel 就是一个document
    // 新建一个实例,并且传参 User是表, userModel 是一个document 的实例;
    const userModel = new User({
      user,type,pwd:md5Pwd(pwd)
    })
    // 存储这个用户并且给它返回cookies
    // 因为这个_id是注册了才有
    // 不用create 改用save, 因为create 不能返回_id
    // save 是获取的
    userModel.save(function(e,d){
      if (e){
        return res.json({
          code: 1.1,
          msg: '数据库抽风,请联系管理员'
        })
      }
      // 这里把获得的doc 只拿里面几个参数
      const {user,type,_id} = d;
      res.cookie('userid',_id,{
        path:'/',
        maxAge: 1000*60*60
      })
      return res.json({
        code:0,
        data: {user,type,_id}
      })
    })


  //   //旧的方法

  //   User.create({user, pwd:md5Pwd(pwd), type},function(e,d){
  //     if (e){
  //       return res.json({
  //         code: 1.1,
  //         msg: '数据库抽风,请联系管理员'
  //       })
  //     }
  //     return res.json({
  //       code: 0,
  //       msg: '注册成功'
  //     })
  //   })



  })
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
  // post的参数用req.body
  // get 的参数用req.query
  const { type } = req.query;
  User.find({type},_filter,function(err,doc){
    res.json({
      code: 0,
      data: doc
    });
  })
});
router.post('/readmsg',function(req,res){
  const userid = req.cookies.userid;
  const {from} = req.body;
  // 默认只找到第一条, 第三个参数就是确定是否所有数据量
  Chat.update(
    {from,to:userid},
    {'$set':{read:true}},
    {'multi':true},
    function(err,doc){
    console.log(doc)
    // {n:1,nModified:0,ok:1} n:数据量, nM: 修改了几行? ok:1 成功
    if(!err){
      return res.json({
        code:0,
        num:doc.nModified
      })
    }
    return res.json({
      code: 1,
      msg: '修改失败'
    })
  })
})

router.post('/update',function(req,res,next){
  const userid = req.cookies.userid;
  if(!userid){
    return json.dumps({
      code: 1
    })
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user: doc.user,
      type: doc.type
    },body)
    return res.json({
      code: 0,
      data: data
    })
  })
})

router.get('/getmsglist',function(req,res,next){
  const user = req.cookies.userid
  // 查询条件多个
  // '$or':[{
  //   from:user,
  //   to:user 
  // }]
  // User 表中 这里先获取所有人的信息;
  User.find({},function(e,userdoc){
    var users = {}
    // 得到所有人的资料去遍历
    // Array.foreach
    userdoc.forEach(function(v){
      users[v._id] = {
        name:v.user,
        avatar: v.avatar}
    })
    
    // 我发出的信息和我收到的信心都查出来
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if(err){
        return res.json({
          code:1
        })
      }
      return res.json({
        code: 0,
        // 把我们的聊天记录;
        msgs:doc,
        // 所有的人的头像资料都暴露出去
        users:users
      })
    })

  })
})

module.exports = router;
