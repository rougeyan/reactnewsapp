import axios from 'axios';
import { gerRedirectPath } from '../util';
//定义派发的事件;

const AUTH_SUCCESS =  'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';


const initState={
  redirectTo: '', // 根据用户跳转;
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}
// reducer
// 这里给他初始化默认值
export function user(state=initState,action){
   switch(action.type){
    case AUTH_SUCCESS:
      return {...state,msg:'', isAuth: true, redirectTo:gerRedirectPath(action.payload),...action.payload}
    case LOAD_DATA:
      return {...state,...action.payload}
    case ERROR_MSG:
      return {...state,isAuth:false, msg:action.msg}
    default:
      return state
  }
}


// 这里就是action

function authSuccess(obj){
  const {pwd, ...data} = obj
  // 这里的做法就是过滤pwd这个字段的信息;
  return {type: AUTH_SUCCESS, payload:data}
}

// 其实用payload也可以,不用
function errorMsg(msg){
  return {type: ERROR_MSG, msg}
}

export function loadData(userinfo){
  return {type: LOAD_DATA, payload:userinfo}   
}




export function login({user,pwd}){
  if(!user || !pwd ){
    return errorMsg('必须输入用户名密码')
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd})
      .then(res=>{
        if(res.status === 200 && res.data.code ===0){
            // 传入 {param.user,params.pwd,params.type}
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })

  }
}


// 这里设计的知识点 就是对象的解构;
// 相当于给一个 params = {user,pwd,repeatpwd,type}
export function regisger({user,pwd,repeatpwd,type}){
  if(!user || !pwd || !type ){
    return errorMsg('必须输入用户名密码')
  }
  if(pwd !== repeatpwd) {
    return errorMsg('两次密码必须相同')
  }
  // 移步操作 返回一个 函数 callback
  return dispatch=>{
    axios.post('/user/regiseter',{user,pwd,type})
      .then(res=>{
        if(res.status === 200 && res.data.code === 0){
            // 传入 {param.user,params.pwd,params.type}
          dispatch(authSuccess({user,pwd,type}))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })

  }
}

export function update(data){
  //应该给以函数 判断传入的任一是否未空?
  
  return dispatch=>{
    axios.post('/user/update',data).then(res =>{
      if(res.status === 200 && res.data.code ===0){
        dispatch(authSuccess(res.data.data))
      }else{
       dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
