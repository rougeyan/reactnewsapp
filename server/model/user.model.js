var mongoose = require('mongoose');
// mongoose 工具函数库?
// 创建实例 
// 实例新productSchema ;
// 优化:
// 我们这里可以对象复制 到models中,神奇,厉害啊艹
const models= {
  user:{
    'user':{type:String,require:true},
    'pwd':{type:String,require:true},
    'type':{type:String,require:true},
    // 头像
    'avatar':{type:String},
    //个人简介
    'desc':{type:String},
    // 职位名
    'title':{type:String},
    //如果你是boss
    'company':{type:String},
    'money':{type:String}
  },
  chat:{
  }
}
// 批量动态
for(let m in models){
   mongoose.model(m,new mongoose.Schema(models[m]))
}
// 直接把mongoose 模块名称读取出来
module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}