import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:3000');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 表示已读信息  //实时维护这个信息
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0
}

export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return {...state, chatmsg:action.payload,unread:action.payload.filter(v=>!v.read).length}
    case MSG_RECV:
      return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+1}
    // case MSG_READ:
    default:
      return state
  }
}
// action creator
function msgList(msgs){
  return {type: 'MSG_LIST',payload:msgs}
}
function msgRecv(msg){
  return {type: 'MSG_RECV',payload:msg}
}

export function recvMsg(){
  return dispatch=>{
    //监听on
    console.log('监听了');
    socket.on('recvmsg',function(data){
      console.log('recvmsg',data)
      dispatch(msgRecv(data))
    })
  }
}
export function getMsgList(){
  return dispatch=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status === 200 && res.data.code === 0){
          dispatch(msgList(res.data.msgs))
        }
      })
  }
}
export function sendMsg({from,to,msg}){
  return dispatch=>{  
    socket.emit('sendmsg',{from,to,msg})
  } 
}