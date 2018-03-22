import axios from 'axios';
import { gerRedirectPath } from '../util';

//定义派发的事件;

const USER_LIST =  'USER_LIST'


const initState = {
  userList: [],
}
// reducer
// 这里给他初始化默认值
export function chatuser(state=initState,action){
   switch(action.type){
    case USER_LIST:
      return {...state, userList:action.payload}
    default:
      return state
  }
}


// 这里就是action

function userList(data){
  return {type: USER_LIST, payload:data}
}

export function getUserList(type){
  return dispatch=>{
    axios.get('/user/list?type='+ type)
      .then(res=>{
        if(res.data.code ===0){
          dispatch(userList(res.data.data))
        }
      })
  }
}