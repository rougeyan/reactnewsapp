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
  unread: 0,
  users: {}
}

export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return {...state, 
              chatmsg:action.payload.msgs,
              // 发送的目标必须是当前的用户;
              unread:action.payload.msgs.filter(v=>!v.read && v.to ===action.payload.userid).length,
              users:action.payload.users}
    case MSG_RECV:
        const  n = action.payload.to == action.userid ? 1 : 0
      return {...state,
              chatmsg:[...state.chatmsg,action.payload],
              unread:state.unread+1}
    case MSG_READ:
    const{from,num} = action.payload;
      return {...state,chatmsg: state.chatmsg.map(v=>{
        if(from == v.from){
          v.read =true;  
        }
        return v
      }),unread:state.unread-num}
    default:
      return state
  }
}
// action creator
function msgList(msgs,users,userid){
  return {type: 'MSG_LIST',payload:{msgs,users,userid}}
}
function msgRecv(msg,userid){
  //这里payload 是一个规范;但是可以直接加上去
  return {type: 'MSG_RECV',payload:msg, userid}
}
function msgRead({from,userid,num}){
  return {type: 'MSG_READ',payload:{from,userid,num}}
}
// 同步修改状态
export function readMsg(from){
  return (dispatch,getState)=>{
    axios.post('/user/readmsg',{from})
      .then(res=>{
        const userid = getState().user._id;
        if(res.status ==200 && res.data.code == 0){
          dispatch(msgRead({userid, from, num:res.data.num}))
        }
      })
  }
}

export function recvMsg(){
  // 第二个参数getState 能够获取应用的所有状态;
  return (dispatch,getState)=>{
    //监听 on
    socket.on('recvmsg',function(data){
      const userid = getState().user._id;
      dispatch(msgRecv(data,userid))
    })
  }
}
export function getMsgList(){
  // 这里第二个参数是 获取上层的state;
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status === 200 && res.data.code === 0){
          // getState 必须要执行才能return这个state;
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs,res.data.users,userid))
        }
      })
  }
}
export function sendMsg({from,to,msg}){
  return dispatch=>{  
    socket.emit('sendmsg',{from,to,msg})
  } 
}