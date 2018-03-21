import axios from 'axios';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState={
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
// reducer
// 这里给他初始化默认值
export function user(state=initState,action){
  switch(action.type){
    case REGISTER_SUCCESS:
      return {...state,msg:'', isAuth: true,...action.payload}
    case ERROR_MSG:
      return {...state,isAuth:false, msg:action.msg}
    default:
      return state
  }
  return state
}
// 这里就是action
function registerSuccess(data){
  return {type: REGISTER_SUCCESS, payload:data}
}
// 其实用payload也可以,不用
function errorMsg(msg){
  return {type: ERROR_MSG, msg}
}



// 这里设计的知识点 就是对象的解构;
// 相当于给一个 params = {user,pwd,repeatpwd,type}
export function regisger({user,pwd,repeatpwd,type}){
  if(!user || !pwd || !type ){
    return errorMsg('必须输入用户名密码')
  }
  if(pwd != repeatpwd) {
    return errorMsg('两次密码必须相同')
  }
  // 移步操作 返回一个 函数 callback
  return dispatch=>{
    axios.post('/usr/regiseter',{user,pwd,type})
      .then(res=>{
        if(res.status == 200 && res.data.code ===0){
            // 传入 {param.user,params.pwd,params.type}
          dispatch(registerSuccess({user,pwd,type}))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })

  }
}
